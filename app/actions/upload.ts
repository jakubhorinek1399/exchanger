'use server'

import { createClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

interface UploadResult {
  success: boolean
  shareId?: string
  error?: string
}

export async function uploadShare(formData: FormData): Promise<UploadResult> {
  try {
    const supabase = await createClient()

    // Extract form data
    const files = formData.getAll('files') as File[]
    const textContent = formData.get('textContent') as string
    const password = formData.get('password') as string
    const expirationMinutes = parseInt(formData.get('expirationMinutes') as string)

    // Validate
    if (files.length === 0 && !textContent) {
      return { success: false, error: 'No files or text provided' }
    }

    // Calculate expiration
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes)

    // Generate unique share ID
    const shareId = nanoid(10) // 10 characters, URL-safe

    // Hash password if provided
    let passwordHash: string | null = null
    if (password) {
      passwordHash = await bcrypt.hash(password, 10)
    }

    // Create share record
    const { error: shareError } = await supabase.from('shares').insert({
      id: shareId,
      text_content: textContent || null,
      password_hash: passwordHash,
      expires_at: expiresAt.toISOString(),
      burn_after_reading: false,
    })

    if (shareError) {
      console.error('Error creating share:', shareError)
      return { success: false, error: 'Failed to create share' }
    }

    // Upload files to storage and create file records
    if (files.length > 0) {
      for (const file of files) {
        if (file.size === 0) continue // Skip empty files

        // Create unique storage path
        const fileExt = file.name.split('.').pop()
        const storagePath = `${shareId}/${nanoid(8)}.${fileExt}`

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('shares')
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) {
          console.error('Error uploading file:', uploadError)
          // Clean up: delete the share record
          await supabase.from('shares').delete().eq('id', shareId)
          return { success: false, error: `Failed to upload ${file.name}` }
        }

        // Get MIME type
        const mimeType = file.type || 'application/octet-stream'

        // Generate stored filename from storage path
        const storedFilename = storagePath.split('/').pop() || file.name

        // Create file record
        const { error: fileError } = await supabase.from('files').insert({
          share_id: shareId,
          filename: storedFilename,
          original_filename: file.name,
          storage_path: storagePath,
          size_bytes: file.size,
          mime_type: mimeType,
        })

        if (fileError) {
          console.error('Error creating file record:', fileError)
          // Clean up: delete uploaded file and share
          await supabase.storage.from('shares').remove([storagePath])
          await supabase.from('shares').delete().eq('id', shareId)
          return { success: false, error: 'Failed to save file information' }
        }
      }
    }

    // Log analytics
    await supabase.from('share_analytics').insert({
      share_id: shareId,
      event_type: 'created',
      metadata: {
        file_count: files.length,
        has_text: !!textContent,
        has_password: !!password,
        expiration_minutes: expirationMinutes,
      },
    })

    return { success: true, shareId }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

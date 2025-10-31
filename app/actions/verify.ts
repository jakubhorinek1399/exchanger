'use server'

import { createClient } from '@/lib/supabase/server'
import bcrypt from 'bcryptjs'

interface VerifyResult {
  success: boolean
  error?: string
}

export async function verifyPassword(
  shareId: string,
  password: string
): Promise<VerifyResult> {
  try {
    const supabase = await createClient()

    // Fetch share
    const { data: share, error } = await supabase
      .from('shares')
      .select('password_hash')
      .eq('id', shareId)
      .single()

    if (error || !share) {
      return { success: false, error: 'Share not found' }
    }

    if (!share.password_hash) {
      return { success: true } // No password required
    }

    // Verify password
    const isValid = await bcrypt.compare(password, share.password_hash)

    if (!isValid) {
      // Log failed attempt
      await supabase.from('share_analytics').insert({
        share_id: shareId,
        event_type: 'password_failed',
      })

      return { success: false, error: 'Incorrect password' }
    }

    // Log successful verification
    await supabase.from('share_analytics').insert({
      share_id: shareId,
      event_type: 'password_verified',
    })

    return { success: true }
  } catch (error) {
    console.error('Password verification error:', error)
    return { success: false, error: 'Verification failed' }
  }
}

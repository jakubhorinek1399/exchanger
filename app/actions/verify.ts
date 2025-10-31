'use server'

import { createClient } from '@supabase/supabase-js'
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
    // Use service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

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

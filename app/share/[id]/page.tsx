import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import ShareDisplay from '@/components/share/ShareDisplay'

interface SharePageProps {
  params: Promise<{ id: string }>
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params

  // Use service role to bypass RLS and read shares
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

  // Fetch share details
  console.log('Fetching share with ID:', id)
  const { data: share, error } = await supabase
    .from('shares')
    .select('*, files(*)')
    .eq('id', id)
    .single()

  console.log('Share fetch result:', { share: !!share, error: !!error, shareData: share })

  if (error) {
    console.error('Error fetching share:', error)
    console.error('Share ID:', id)
    notFound()
  }

  if (!share) {
    console.error('Share not found:', id)
    notFound()
  }

  // Check if expired - add Z if missing to ensure UTC parsing
  const expiresAtString = share.expires_at.endsWith('Z') ? share.expires_at : share.expires_at + 'Z'
  const expiresAt = new Date(expiresAtString)
  const now = new Date()
  console.log('Expiration check:', { expiresAtString, expiresAt, now, expired: expiresAt < now })
  if (expiresAt < now) {
    console.log('Share expired, showing 404')
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/s/${id}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-16">
        <ShareDisplay
          shareId={id}
          shareUrl={shareUrl}
          expiresAt={share.expires_at}
          hasPassword={!!share.password_hash}
          fileCount={share.files?.length || 0}
          hasText={!!share.text_content}
        />
      </div>
    </main>
  )
}

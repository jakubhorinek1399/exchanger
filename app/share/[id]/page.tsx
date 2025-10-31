import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ShareDisplay from '@/components/share/ShareDisplay'

interface SharePageProps {
  params: Promise<{ id: string }>
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch share details
  const { data: share, error } = await supabase
    .from('shares')
    .select('*, files(*)')
    .eq('id', id)
    .single()

  if (error || !share) {
    notFound()
  }

  // Check if expired
  const expiresAt = new Date(share.expires_at)
  const now = new Date()
  if (expiresAt < now) {
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

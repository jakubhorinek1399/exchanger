import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ContentView from '@/components/share/ContentView'

interface ViewPageProps {
  params: Promise<{ id: string }>
}

export default async function ViewPage({ params }: ViewPageProps) {
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
    // Delete expired share
    await supabase.from('shares').delete().eq('id', id)
    notFound()
  }

  // Increment view count
  await supabase
    .from('shares')
    .update({ view_count: (share.view_count || 0) + 1 })
    .eq('id', id)

  // Log analytics
  await supabase.from('share_analytics').insert({
    share_id: id,
    event_type: 'viewed',
    metadata: {
      view_count: share.view_count + 1,
    },
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-16">
        <ContentView
          shareId={id}
          share={share}
          hasPassword={!!share.password_hash}
        />
      </div>
    </main>
  )
}

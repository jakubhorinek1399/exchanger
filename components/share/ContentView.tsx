'use client'

import { useState, useEffect } from 'react'
import { verifyPassword } from '@/app/actions/verify'

interface File {
  id: string
  filename: string
  original_filename: string
  storage_path: string
  size_bytes: number
  mime_type: string
}

interface Share {
  id: string
  text_content: string | null
  expires_at: string
  burn_after_reading: boolean
  view_count: number
  files: File[]
}

interface ContentViewProps {
  shareId: string
  share: Share
  hasPassword: boolean
}

export default function ContentView({ shareId, share, hasPassword }: ContentViewProps) {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(!hasPassword)
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('')

  // Calculate time remaining
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const expires = new Date(share.expires_at)
      const diff = expires.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining('Expired')
        return
      }

      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      if (minutes > 60) {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        setTimeRemaining(`${hours}h ${mins}m`)
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(`${seconds}s`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [share.expires_at])

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError(null)

    try {
      const result = await verifyPassword(shareId, password)
      if (result.success) {
        setIsUnlocked(true)
      } else {
        setError(result.error || 'Incorrect password')
      }
    } catch (err) {
      setError('Failed to verify password')
    } finally {
      setIsVerifying(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileDownloadUrl = (storagePath: string) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return `${supabaseUrl}/storage/v1/object/public/shares/${storagePath}`
  }

  // Show password form if locked
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Password Protected
            </h1>
            <p className="text-gray-600">
              This share is password protected. Enter the password to view the content.
            </p>
          </div>

          <form onSubmit={handleVerifyPassword} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || !password}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isVerifying ? 'Verifying...' : 'Unlock'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            Expires in <span className="font-semibold text-blue-600">{timeRemaining}</span>
          </div>
        </div>
      </div>
    )
  }

  // Show content
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Shared Content
        </h1>
        <p className="text-gray-600">
          Expires in <span className="font-semibold text-blue-600">{timeRemaining}</span>
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Files Section */}
        {share.files && share.files.length > 0 && (
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Files ({share.files.length})
            </h2>

            <div className="space-y-3">
              {share.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.original_filename}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size_bytes)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={getFileDownloadUrl(file.storage_path)}
                    download={file.original_filename}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text Section */}
        {share.text_content && (
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Text Content
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900 break-words">
                {share.text_content}
              </pre>
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(share.text_content || '')}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Text
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>
              This content will be automatically deleted when the timer expires.
              {share.burn_after_reading && ' This share will also be deleted after viewing.'}
            </p>
          </div>
        </div>
      </div>

      {/* Create Your Own */}
      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all font-medium shadow-lg hover:shadow-xl"
        >
          Create Your Own Share
        </a>
      </div>
    </div>
  )
}

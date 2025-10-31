'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { uploadShare } from '@/app/actions/upload'
import FileUploadZone from './FileUploadZone'
import TextEditor from './TextEditor'

export default function UploadSection() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [textContent, setTextContent] = useState('')
  const [password, setPassword] = useState('')
  const [expirationMinutes, setExpirationMinutes] = useState(15)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles])
      setError(null) // Clear any previous errors
    },
    maxSize: 250 * 1024 * 1024, // 250MB for free users
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2)

  const handleUpload = async () => {
    setIsUploading(true)
    setError(null)

    try {
      // Create FormData
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))
      formData.append('textContent', textContent)
      formData.append('password', password)
      formData.append('expirationMinutes', expirationMinutes.toString())

      // Upload
      const result = await uploadShare(formData)

      if (result.success && result.shareId) {
        // Redirect to share page
        router.push(`/share/${result.shareId}`)
      } else {
        setError(result.error || 'Upload failed. Please try again.')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* File Upload Zone */}
        <div className="p-8 border-b border-gray-100">
          <FileUploadZone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            files={files}
            removeFile={removeFile}
            totalSizeMB={totalSizeMB}
          />
        </div>

        {/* Text Editor */}
        <div className="p-8 border-b border-gray-100">
          <TextEditor
            value={textContent}
            onChange={setTextContent}
          />
        </div>

        {/* Options */}
        <div className="p-8 bg-gray-50 space-y-6">
          {/* Password Protection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password Protection (Optional)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to protect your share"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Expiration Time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Expires in
            </label>
            <select
              value={expirationMinutes}
              onChange={(e) => setExpirationMinutes(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value={15}>15 minutes</option>
              <option value={30} disabled className="text-gray-400">30 minutes (Premium)</option>
              <option value={60} disabled className="text-gray-400">1 hour (Premium)</option>
              <option value={360} disabled className="text-gray-400">6 hours (Premium)</option>
              <option value={1440} disabled className="text-gray-400">1 day (Premium)</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={isUploading || (files.length === 0 && !textContent)}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-violet-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </span>
            ) : files.length === 0 && !textContent ? (
              'Add files or text to continue'
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Share Now
              </span>
            )}
          </button>

          {/* Info */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <strong>What happens next:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Your files/text are encrypted and uploaded</li>
                <li>• You get a unique link and QR code</li>
                <li>• Share it with anyone</li>
                <li>• Everything auto-deletes after expiration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

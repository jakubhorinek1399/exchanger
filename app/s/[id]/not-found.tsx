export default function ContentNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Content Expired
            </h1>
            <p className="text-gray-600 mb-6">
              This content has expired and has been automatically deleted for security.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-left">
              <p className="text-blue-900">
                <strong>Why did this happen?</strong>
              </p>
              <ul className="mt-2 space-y-1 text-blue-800">
                <li>• The share reached its expiration time</li>
                <li>• The link was invalid or mistyped</li>
                <li>• The content was deleted by the owner</li>
              </ul>
            </div>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all font-medium"
            >
              Create Your Own Share
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

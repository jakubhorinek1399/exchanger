interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const characterCount = value.length
  const maxCharacters = 50000 // Free tier limit

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Or paste text</h2>
        <span className="text-sm text-gray-500">
          {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()} characters
        </span>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or type your text here... You can share code snippets, notes, links, or any text content."
          maxLength={maxCharacters}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y font-mono text-sm"
        />

        {value.length > 0 && (
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            aria-label="Clear text"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-2 flex items-start gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p>
          Text will be formatted and displayed exactly as entered. Great for code snippets,
          links, or quick notes.
        </p>
      </div>
    </div>
  )
}

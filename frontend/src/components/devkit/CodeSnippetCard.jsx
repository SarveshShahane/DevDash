import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Edit2, Trash2, Copy, Tag, Calendar, Check } from 'lucide-react'

const CodeSnippetCard = ({ snippet, index, onEdit, onDelete }) => {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      typescript: 'bg-blue-900/50 text-blue-300 border-blue-700',
      python: 'bg-green-900/50 text-green-300 border-green-700',
      java: 'bg-orange-900/50 text-orange-300 border-orange-700',
      css: 'bg-purple-900/50 text-purple-300 border-purple-700',
      html: 'bg-red-900/50 text-red-300 border-red-700',
      react: 'bg-cyan-900/50 text-cyan-300 border-cyan-700',
      vue: 'bg-emerald-900/50 text-emerald-300 border-emerald-700',
      angular: 'bg-rose-900/50 text-rose-300 border-rose-700',
      node: 'bg-lime-900/50 text-lime-300 border-lime-700',
      default: 'bg-gray-900/50 text-gray-300 border-gray-700'
    }
    return colors[language.toLowerCase()] || colors.default
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-900/50 text-green-300 border-green-700'
      case 'intermediate':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700'
      case 'advanced':
        return 'bg-red-900/50 text-red-300 border-red-700'
      default:
        return 'bg-gray-900/50 text-gray-300 border-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-all group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Code size={16} className="text-purple-400 flex-shrink-0" />
            <h3 className="text-white font-medium">{snippet.title}</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Calendar size={12} />
            <span>{formatDate(snippet.createdAt)}</span>
            {snippet.updatedAt !== snippet.createdAt && (
              <>
                <span>•</span>
                <span>Updated {formatDate(snippet.updatedAt)}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 text-xs rounded-full border ${getLanguageColor(snippet.language)}`}>
              {snippet.language}
            </span>
            <span className="px-2 py-1 text-xs bg-amber-900/50 text-amber-300 rounded-full border border-amber-700">
              {snippet.category}
            </span>
            {snippet.difficulty && (
              <span className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(snippet.difficulty)}`}>
                {snippet.difficulty}
              </span>
            )}
            {snippet.tags && snippet.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full border border-blue-700 flex items-center gap-1"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {snippet.description && (
            <p className="text-sm text-gray-400 mb-3">{snippet.description}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            <button
              onClick={copyToClipboard}
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onEdit(snippet)}
            className="text-gray-500 hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 border-t border-gray-700 pt-4"
          >
            <div className="relative">
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                <code className="text-gray-300 whitespace-pre-wrap">
                  {snippet.code}
                </code>
              </pre>
              <button
                onClick={copyToClipboard}
                className={`absolute top-3 right-3 p-2 rounded ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                } transition-all`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            
            {snippet.usage && (
              <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Usage Notes:</h4>
                <p className="text-sm text-gray-400">{snippet.usage}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CodeSnippetCard

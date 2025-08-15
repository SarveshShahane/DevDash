import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Edit2, Trash2, Link, Tag, Calendar } from 'lucide-react'

const LinkVaultCard = ({ link, index, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900/50 text-red-300 border-red-700'
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700'
      case 'low':
        return 'bg-green-900/50 text-green-300 border-green-700'
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
      className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link size={16} className="text-blue-400 flex-shrink-0" />
            <h3 className="text-white font-medium truncate">{link.title}</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span className="truncate">{getDomainFromUrl(link.url)}</span>
            <span>•</span>
            <Calendar size={12} />
            <span>{formatDate(link.createdAt)}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(link.priority)}`}>
              {link.priority || 'normal'}
            </span>
            <span className="px-2 py-1 text-xs bg-amber-900/50 text-amber-300 rounded-full border border-amber-700">
              {link.category}
            </span>
            {link.tags && link.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full border border-purple-700 flex items-center gap-1"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {link.description && (
            <p className="text-sm text-gray-400 line-clamp-2">{link.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onEdit(link)}
            className="text-gray-500 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={16} />
          </button>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {showDetails && link.notes && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 pt-3 border-t border-gray-700"
        >
          <p className="text-sm text-gray-300">{link.notes}</p>
        </motion.div>
      )}

      {link.notes && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-2 text-xs text-gray-500 hover:text-gray-400 transition-colors"
        >
          {showDetails ? 'Hide notes' : 'Show notes'}
        </button>
      )}
    </motion.div>
  )
}

export default LinkVaultCard

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookmarkStore } from '../../zustand/store'
import { Save, X } from 'lucide-react'

const BookmarkForm = ({ onClose, editingBookmark = null }) => {
  const { addBookmark, editBookmark, saveToLocal } = useBookmarkStore()
  const [formData, setFormData] = useState({
    name: editingBookmark?.name || '',
    url: editingBookmark?.url || '',
    category: editingBookmark?.category || '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required'
    } else if (!/^https?:\/\/.+/.test(formData.url.trim())) {
      newErrors.url = 'Please enter a valid URL starting with http:// or https://'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const bookmarkData = {
      id: editingBookmark?.id || Date.now(),
      name: formData.name.trim(),
      url: formData.url.trim(),
      category: formData.category.trim(),
      createdAt: editingBookmark?.createdAt || new Date().toISOString()
    }

    if (editingBookmark) {
      editBookmark(bookmarkData)
    } else {
      addBookmark(bookmarkData)
      saveToLocal()
    }

    setFormData({
      name: '',
      url: '',
      category: '',
    })
    setErrors({})

    if (onClose) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-4 rounded-lg border border-amber-700 mb-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-amber-400">
            {editingBookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='block text-sm text-gray-400 mb-1'>
              Name <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
              type="text"
              name='name'
              placeholder='Website name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label className='block text-sm text-gray-400 mb-1'>
              URL <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent ${errors.url ? 'border-red-500' : 'border-gray-700'
                }`}
              type="url"
              name='url'
              placeholder='https://example.com'
              value={formData.url}
              onChange={handleChange}
              required
            />
            {errors.url && (
              <p className="text-red-400 text-xs mt-1">{errors.url}</p>
            )}
          </div>

          <div className="form-group">
            <label className='block text-sm text-gray-400 mb-1'>
              Category <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-700'
                }`}
              type="text"
              name='category'
              placeholder='Frontend, Backend, Design, etc.'
              value={formData.category}
              onChange={handleChange}
              required
            />
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              className='px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-md flex items-center transition-colors'
              type='submit'
            >
              <Save className="h-4 w-4 mr-2" />
              {editingBookmark ? 'Update Bookmark' : 'Add Bookmark'}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors'
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookmarkForm
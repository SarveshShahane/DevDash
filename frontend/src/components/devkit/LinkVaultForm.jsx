import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../zustand/store'
import { Save, X, Plus, Tag } from 'lucide-react'

const LinkVaultForm = ({ onClose, editingLink = null }) => {
  const { addLink, editLink } = useStore()
  const [formData, setFormData] = useState({
    title: editingLink?.title || '',
    url: editingLink?.url || '',
    category: editingLink?.category || '',
    description: editingLink?.description || '',
    priority: editingLink?.priority || 'normal',
    tags: editingLink?.tags || [],
    notes: editingLink?.notes || ''
  })
  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState({})

  const categories = [
    'Learning', 'Documentation', 'Tools', 'Inspiration', 'Libraries',
    'Tutorials', 'Articles', 'Resources', 'References', 'Others'
  ]

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-400' },
    { value: 'normal', label: 'Normal', color: 'text-gray-400' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-400' },
    { value: 'high', label: 'High Priority', color: 'text-red-400' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
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

    const linkData = {
      id: editingLink?.id || Date.now(),
      title: formData.title.trim(),
      url: formData.url.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      tags: formData.tags,
      notes: formData.notes.trim(),
      createdAt: editingLink?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (editingLink) {
      editLink(linkData)
    } else {
      addLink(linkData)
    }

    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-6 rounded-lg border border-blue-700 mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-blue-400">
            {editingLink ? 'Edit Link' : 'Add New Link'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-700'
                }`}
                type="text"
                name="title"
                placeholder="Link title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                URL <span className="text-red-400">*</span>
              </label>
              <input
                className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.url ? 'border-red-500' : 'border-gray-700'
                }`}
                type="url"
                name="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={handleChange}
                required
              />
              {errors.url && (
                <p className="text-red-400 text-xs mt-1">{errors.url}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-700'
                }`}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Priority</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="description"
              placeholder="Brief description of the link"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full border border-purple-700 flex items-center gap-1"
                  >
                    <Tag size={10} />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-purple-400 hover:text-purple-300"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Notes</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="notes"
              placeholder="Additional notes or details"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md flex items-center gap-2 transition-colors"
            >
              <Save size={16} />
              {editingLink ? 'Update Link' : 'Add Link'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

export default LinkVaultForm

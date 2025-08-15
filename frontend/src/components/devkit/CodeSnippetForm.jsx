import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../zustand/store'
import { Save, X, Plus, Tag, Code } from 'lucide-react'

const CodeSnippetForm = ({ onClose, editingSnippet = null }) => {
  const { addCodeSnippet, editCodeSnippet } = useStore()
  const [formData, setFormData] = useState({
    title: editingSnippet?.title || '',
    code: editingSnippet?.code || '',
    language: editingSnippet?.language || 'javascript',
    category: editingSnippet?.category || '',
    description: editingSnippet?.description || '',
    difficulty: editingSnippet?.difficulty || 'intermediate',
    tags: editingSnippet?.tags || [],
    usage: editingSnippet?.usage || ''
  })
  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState({})

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'css', 'html', 'react', 
    'vue', 'angular', 'node', 'php', 'ruby', 'go', 'rust', 'cpp', 'c', 
    'csharp', 'swift', 'kotlin', 'dart', 'sql', 'bash', 'powershell'
  ]

  const categories = [
    'Algorithm', 'Component', 'Hook', 'Utility', 'API', 'Database',
    'Authentication', 'Validation', 'Animation', 'Style', 'Testing',
    'Configuration', 'Helper', 'Template', 'Pattern', 'Others'
  ]

  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: 'text-green-400' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-400' },
    { value: 'advanced', label: 'Advanced', color: 'text-red-400' }
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

    if (!formData.code.trim()) {
      newErrors.code = 'Code is required'
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

    const snippetData = {
      id: editingSnippet?.id || Date.now(),
      title: formData.title.trim(),
      code: formData.code.trim(),
      language: formData.language,
      category: formData.category.trim(),
      description: formData.description.trim(),
      difficulty: formData.difficulty,
      tags: formData.tags,
      usage: formData.usage.trim(),
      createdAt: editingSnippet?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (editingSnippet) {
      editCodeSnippet(snippetData)
    } else {
      addCodeSnippet(snippetData)
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
        className="bg-gray-900 p-6 rounded-lg border border-purple-700 mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-purple-400 flex items-center gap-2">
            <Code size={24} />
            {editingSnippet ? 'Edit Code Snippet' : 'Add New Code Snippet'}
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
                className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-700'
                }`}
                type="text"
                name="title"
                placeholder="Snippet title"
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
                Language <span className="text-red-400">*</span>
              </label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
              <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Code <span className="text-red-400">*</span>
            </label>
            <textarea
              className={`w-full bg-gray-800 border rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm ${
                errors.code ? 'border-red-500' : 'border-gray-700'
              }`}
              name="code"
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={handleChange}
              rows={12}
              required
            />
            {errors.code && (
              <p className="text-red-400 text-xs mt-1">{errors.code}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              name="description"
              placeholder="Brief description of what this code does"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="text"
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full border border-blue-700 flex items-center gap-1"
                  >
                    <Tag size={10} />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-400 hover:text-blue-300"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Usage Notes</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              name="usage"
              placeholder="How to use this code snippet, dependencies, etc."
              value={formData.usage}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md flex items-center gap-2 transition-colors"
            >
              <Save size={16} />
              {editingSnippet ? 'Update Snippet' : 'Add Snippet'}
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

export default CodeSnippetForm

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Filter, Link, Code, Bookmark, Hash, Cpu, Database, Sparkles, ChevronDown } from 'lucide-react'
import { aiTools, devTools, referenceTools } from '../utils/data.js'
import AIToolCard from '../components/devkit/AIToolCard.jsx'
import DevToolCard from '../components/devkit/DevToolCard.jsx'
import BookMarkCard from '../components/devkit/BookMarkCard.jsx'
import LinkVaultCard from '../components/devkit/LinkVaultCard'
import LinkVaultForm from '../components/devkit/LinkVaultForm'
import CodeSnippetCard from '../components/devkit/CodeSnippetCard'
import CodeSnippetForm from '../components/devkit/CodeSnippetForm'
import BookmarkForm from '../components/devkit/BookmarkForm.jsx'
import { useBookmarkStore, useVaultStore } from '../zustand/store.js'
import { initializeDemoData } from '../utils/demoData.js'
const Devkit = () => {
  const [activeTab, setActiveTab] = useState('link-vault')
  const [searchTerm, setSearchTerm] = useState('')
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [showSnippetForm, setShowSnippetForm] = useState(false)
  const [showBookmarkForm, setShowBookmarkForm] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [editingSnippet, setEditingSnippet] = useState(null)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { bookmarks, removeBookmark } = useBookmarkStore()
  const { 
    links, 
    removeLink, 
    codeSnippets, 
    removeCodeSnippet 
  } = useVaultStore()
  const tabs = [
    { id: 'link-vault', label: 'Link Vault', icon: Link, count: links.length },
    { id: 'code-vault', label: 'Code Snippets', icon: Code, count: codeSnippets.length },
    { id: 'ai-tools', label: 'AI Tools', icon: Cpu },
    { id: 'dev-tools', label: 'Dev Tools', icon: Hash },
    { id: 'reference-tools', label: 'References', icon: Database },
    { id: 'bookmarks', label: 'Quick Links', icon: Bookmark, count: bookmarks.length }
  ]

  const handleEditLink = (link) => {
    setEditingLink(link)
    setShowLinkForm(true)
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedLanguage('all')
    setSelectedPriority('all')
    setIsDropdownOpen(false)
  }

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet)
    setShowSnippetForm(true)
  }

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark)
    setShowBookmarkForm(true)
  }

  const handleCloseForm = () => {
    setShowLinkForm(false)
    setShowSnippetForm(false)
    setShowBookmarkForm(false)
    setEditingLink(null)
    setEditingSnippet(null)
    setEditingBookmark(null)
  }

  const handleInitializeDemoData = () => {
    initializeDemoData(useVaultStore)
  }

  const getFilteredLinks = () => {
    return links.filter(link => {
      const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory
      const matchesPriority = selectedPriority === 'all' || link.priority === selectedPriority
      
      return matchesSearch && matchesCategory && matchesPriority
    })
  }

  const getFilteredSnippets = () => {
    return codeSnippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory
      const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage
      
      return matchesSearch && matchesCategory && matchesLanguage
    })
  }

  const getFilteredBookmarks = () => {
    return bookmarks.filter(bookmark =>
      bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredObjects = (objects) => {
    return objects.filter((object) => (
      object.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      object.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      object.category.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }

  const getLinkCategories = () => {
    const categories = [...new Set(links.map(link => link.category))].filter(Boolean)
    return ['all', ...categories]
  }

  const getSnippetCategories = () => {
    const categories = [...new Set(codeSnippets.map(snippet => snippet.category))].filter(Boolean)
    return ['all', ...categories]
  }

  const getLanguages = () => {
    const languages = [...new Set(codeSnippets.map(snippet => snippet.language))].filter(Boolean)
    return ['all', ...languages]
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case 'link-vault':
        const filteredLinks = getFilteredLinks()
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                  <Link size={24} />
                  Personal Link Vault
                </h2>
                <p className="text-gray-400 mt-1">Organize and categorize your important development links</p>
              </div>
              <button
                onClick={() => setShowLinkForm(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md flex items-center gap-2 transition-colors"
              >
                <Plus size={16} />
                Add Link
              </button>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white text-sm"
                >
                  {getLinkCategories().map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="normal">Normal</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {showLinkForm && (
              <LinkVaultForm
                onClose={handleCloseForm}
                editingLink={editingLink}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredLinks.map((link, index) => (
                  <LinkVaultCard
                    key={link.id}
                    link={link}
                    index={index}
                    onEdit={handleEditLink}
                    onDelete={removeLink}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredLinks.length === 0 && (
              <div className="text-center py-12">
                <Link size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">
                  {searchTerm ? 'No links match your search' : 'No links in vault yet'}
                </p>
                <button
                  onClick={() => setShowLinkForm(true)}
                  className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                >
                  Add Your First Link
                </button>
              </div>
            )}
          </div>
        )

      case 'code-vault':
        const filteredSnippets = getFilteredSnippets()
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                  <Code size={24} />
                  Code Snippet Vault
                </h2>
                <p className="text-gray-400 mt-1">Store and organize your reusable code snippets</p>
              </div>
              <button
                onClick={() => setShowSnippetForm(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md flex items-center gap-2 transition-colors"
              >
                <Plus size={16} />
                Add Snippet
              </button>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white text-sm"
                >
                  {getSnippetCategories().map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white text-sm"
              >
                {getLanguages().map(language => (
                  <option key={language} value={language}>
                    {language === 'all' ? 'All Languages' : language.charAt(0).toUpperCase() + language.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {showSnippetForm && (
              <CodeSnippetForm
                onClose={handleCloseForm}
                editingSnippet={editingSnippet}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredSnippets.map((snippet, index) => (
                  <CodeSnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    index={index}
                    onEdit={handleEditSnippet}
                    onDelete={removeCodeSnippet}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredSnippets.length === 0 && (
              <div className="text-center py-12">
                <Code size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">
                  {searchTerm ? 'No snippets match your search' : 'No code snippets yet'}
                </p>
                <button
                  onClick={() => setShowSnippetForm(true)}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors"
                >
                  Add Your First Snippet
                </button>
              </div>
            )}
          </div>
        )

      case 'ai-tools':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-bold text-blue-400 flex items-center'>
                <Cpu className='mr-2' />
                AI Tools
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredObjects(aiTools).map((tool, i) => (
                <AIToolCard
                  key={tool.name}
                  index={i}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  category={tool.category}
                  url={tool.url}
                />
              ))}
            </div>
          </div>
        )

      case 'dev-tools':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-bold flex items-center text-green-400'>
                <Code className='mr-2' />
                Development Tools
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredObjects(devTools).map((tool, i) => (
                <DevToolCard
                  key={tool.name}
                  index={i}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  category={tool.category}
                  url={tool.url}
                />
              ))}
            </div>
          </div>
        )

      case 'reference-tools':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-bold flex items-center text-purple-400'>
                <Database className='mr-2' />
                Documentation & References
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredObjects(referenceTools).map((tool, i) => (
                <DevToolCard
                  key={tool.name}
                  index={i}
                  name={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  category={tool.category}
                  url={tool.url}
                />
              ))}
            </div>
          </div>
        )

      case 'bookmarks':
        const filteredBookmarks = getFilteredBookmarks()
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                  <Bookmark size={24} />
                  Quick Links
                </h2>
                <p className="text-gray-400 mt-1">Simple bookmarks for quick access</p>
              </div>
              <button
                onClick={() => setShowBookmarkForm(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-md flex items-center gap-2 transition-colors"
              >
                <Plus size={16} />
                Add Bookmark
              </button>
            </div>

            {showBookmarkForm && (
              <BookmarkForm
                onClose={handleCloseForm}
                editingBookmark={editingBookmark}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredBookmarks.map((bookmark, index) => (
                  <BookMarkCard
                    key={index}
                    index={index}
                    name={bookmark.name}
                    url={bookmark.url}
                    category={bookmark.category}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredBookmarks.length === 0 && (
              <div className="text-center py-12">
                <Bookmark size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">
                  {searchTerm ? 'No bookmarks match your search' : 'No bookmarks yet'}
                </p>
                <button
                  onClick={() => setShowBookmarkForm(true)}
                  className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-md transition-colors"
                >
                  Add Your First Bookmark
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent mb-4">
            Developer Toolkit
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Your complete collection of development resources, tools, and code snippets
          </p>
          
          {links.length === 0 && codeSnippets.length === 0 && (
            <button
              onClick={handleInitializeDemoData}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
            >
              <Sparkles size={16} />
              Load Demo Data
            </button>
          )}
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tools, links, code snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-8">
          {/* Desktop Tab Navigation - Hidden on screens below 668px */}
          <div className="hidden sm:flex flex-wrap gap-2 border-b border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-3 rounded-t-lg flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Mobile Dropdown Navigation - Visible only on screens below 668px */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between text-white"
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const activeTabData = tabs.find(tab => tab.id === activeTab)
                  const Icon = activeTabData?.icon
                  return (
                    <>
                      {Icon && <Icon size={16} />}
                      {activeTabData?.label}
                      {activeTabData?.count !== undefined && (
                        <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                          {activeTabData.count}
                        </span>
                      )}
                    </>
                  )
                })()}
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full px-4 py-3 flex items-center gap-2 text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={16} />
                        {tab.label}
                        {tab.count !== undefined && (
                          <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full ml-auto">
                            {tab.count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Devkit
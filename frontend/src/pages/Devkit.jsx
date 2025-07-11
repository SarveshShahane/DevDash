import React, { useState } from 'react'
import { aiTools, devTools, referenceTools } from '../utils/data.js'
import AIToolCard from '../components/devkit/AIToolCard.jsx'
import DevToolCard from '../components/devkit/DevToolCard.jsx'
import { Cpu, Bookmark, Code, Search, Database, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'
import BookmarkForm from '../components/devkit/BookmarkForm.jsx'
import { useBookmarkStore } from '../zustand/store.js'
import BookMarkCard from '../components/devkit/BookMarkCard.jsx'
const Devkit = () => {
  const {bookmarks}= useBookmarkStore()
  const [activeTab, setActiveTab] = useState('ai-tools')
  const [query, setQuery] = useState('')
  const [newBookmark, setNewBookmark] = useState(false)
  const filteredObjects = (objects) => {
    return objects.filter((object) => (
      object.name.toLowerCase().includes(query.toLowerCase()) ||
      object.description?.toLowerCase().includes(query.toLowerCase()) ||
      object.category.toLowerCase().includes(query.toLowerCase())
    ))
  }
  return (
    <div>
      <div className="flex flex-col p-3">
        <h1 className='font-semibold text-white mb-2'>DevKit</h1>
        <p className="text-gray-400">Your all-in-one developer toolkit with essential resources, tools, and utilities.</p>
        <div className='relative mb-6'>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className='text-gray-400 h-5 w-5' />
          </div>
          <input
            type="text"
            className='bg-gray-800 text-white pr-4 py-2 w-full pl-10 rounded-lg border border-gray-700  focus:ring-blue-500 focus:border-transparent'
            placeholder='Search tools,categories,snippets...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-wrap gap-2 mb-6 border-b border-gray-700'>
        <button
          className={`px-3 py-2 text-sm font-medium transition-colors rounded-t-md ${activeTab === 'ai-tools' ? 'text-blue-400 bg-gray-800 border-b-2 border-blue-400 ' : 'text-gray-400 hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('ai-tools')}>
          <Cpu className='inline mr-2 h-4 w-4' />
          AI Tools
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium transition-colors rounded-t-md ${activeTab === 'dev-tools' ? 'text-blue-400 bg-gray-800 border-b-2 border-blue-400 ' : 'text-gray-400 hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('dev-tools')}>
          <Code className='inline mr-2 h-4 w-4' />
          Dev Tools
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium transition-colors rounded-t-md ${activeTab === 'reference-tools' ? 'text-blue-400 bg-gray-800 border-b-2 border-blue-400 ' : 'text-gray-400 hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('reference-tools')}>
          <Database className='inline mr-2 h-4 w-4' />
          Reference
        </button>
        <button
          className={`px-3 py-2 text-sm font-medium transition-colors rounded-t-md ${activeTab === 'bookmark' ? 'text-blue-400 bg-gray-800 border-b-2 border-blue-400 ' : 'text-gray-400 hover:text-gray-300'
            }`}
          onClick={() => setActiveTab('bookmark')}>
          <Bookmark className='inline mr-2 h-4 w-4' />
          Bookmarks
        </button>

      </div>
      {
        activeTab === 'ai-tools' && (
          <div>
            <div className="flex  justify-between items-center mb-4">
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
        )}
      {
        activeTab === 'dev-tools' && (
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
        )}
      {
        activeTab === 'reference-tools' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-bold flex items-center text-purple-400'>
                <Code className='mr-2' />
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
        )}
      {
        activeTab === 'bookmark' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-bold flex items-center justify-between text-red-400'>
                <Bookmark className='mr-2' />
                Bookmarks
              </h2>
              <motion.button
              onClick={()=>setNewBookmark(!newBookmark)}
                className='px-3 py-2 bg-red-400 text-xs rounded-2xl text-white font-semibold '
              >
                Add Bookmark
              </motion.button>
            </div>
            {newBookmark&&
              <BookmarkForm />
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.length > 0 ? (
                filteredObjects(bookmarks).map((bookmark, i) => (
                  <BookMarkCard
                    key={i}
                    index={i}
                    name={bookmark.name}
                    category={bookmark.category}
                    url={bookmark.url}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-400">
                  No bookmarks found. Add some to get started!
                </div>
              )}
            </div>
          </div>
        )}

    </div>
  )
}

export default Devkit
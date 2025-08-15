import React, { useState } from 'react'
import { useContestData } from '../hooks/useContestData'
import { useContestStore } from '../zustand/store'
import { motion } from 'framer-motion'
import { Calendar, Clock, ExternalLink, Trophy, Filter, Globe, Users } from 'lucide-react'

const Contests = () => {
  const { data, loading } = useContestData()
  const { contestData } = useContestStore()
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [sortBy, setSortBy] = useState('startTime')

  if (!data || loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading contest data...</p>
      </div>
    </div>
  )

  const allContests = contestData.allContests.map((contest) => ({
    id: contest.id,
    title: contest.title,
    host: contest.host,
    startTime: new Date(contest.startTime),
    endTime: new Date(contest.endTime),
    duration: contest.duration / 60,
    url: contest.url,
    platform: contest.host.includes('leetcode') ? 'leetcode' : 
              contest.host.includes('atcoder') ? 'atcoder' : 
              contest.host.includes('codechef') ? 'codechef' : 'other'
  }))

  const filteredContests = allContests
    .filter(contest => selectedPlatform === 'all' || contest.platform === selectedPlatform)
    .sort((a, b) => {
      if (sortBy === 'startTime') return a.startTime - b.startTime
      if (sortBy === 'duration') return a.duration - b.duration
      return a.title.localeCompare(b.title)
    })

  const platforms = [
    { id: 'all', name: 'All Platforms', color: '#8B5CF6' },
    { id: 'leetcode', name: 'LeetCode', color: '#FFA116' },
    { id: 'atcoder', name: 'AtCoder', color: '#3B82F6' },
    { id: 'codechef', name: 'CodeChef', color: '#8B4513' }
  ]

  const getTimeUntilContest = (startTime) => {
    const now = new Date()
    const diff = startTime - now
    
    if (diff < 0) return 'Started'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'leetcode': return '🔥'
      case 'atcoder': return '🎌'
      case 'codechef': return '🍴'
      default: return '💻'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Trophy className="mr-3 text-yellow-400" size={32} />
          <h1 className="text-3xl font-bold text-white">Upcoming Contests</h1>
        </div>
        <p className="text-gray-400">
          Stay updated with competitive programming contests across multiple platforms
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <Calendar className="mx-auto mb-3 text-blue-400" size={24} />
          <div className="text-2xl font-bold text-white">{allContests.length}</div>
          <div className="text-sm text-gray-400">Total Contests</div>
        </div>
        
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <Globe className="mx-auto mb-3 text-green-400" size={24} />
          <div className="text-2xl font-bold text-white">
            {[...new Set(allContests.map(c => c.platform))].length}
          </div>
          <div className="text-sm text-gray-400">Platforms</div>
        </div>
        
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <Clock className="mx-auto mb-3 text-yellow-400" size={24} />
          <div className="text-2xl font-bold text-white">
            {allContests.filter(c => c.startTime > new Date()).length}
          </div>
          <div className="text-sm text-gray-400">Upcoming</div>
        </div>
        
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <Users className="mx-auto mb-3 text-purple-400" size={24} />
          <div className="text-2xl font-bold text-white">
            {Math.round(allContests.reduce((sum, c) => sum + c.duration, 0) / allContests.length)}m
          </div>
          <div className="text-sm text-gray-400">Avg Duration</div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" size={20} />
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPlatform === platform.id
                      ? 'text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  style={{
                    backgroundColor: selectedPlatform === platform.id ? platform.color : undefined
                  }}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="startTime">Start Time</option>
              <option value="duration">Duration</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {filteredContests.length > 0 ? (
          filteredContests.map((contest, index) => (
            <motion.div
              key={contest.id}
              className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all group"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getPlatformIcon(contest.platform)}</span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${platforms.find(p => p.id === contest.platform)?.color || '#8B5CF6'}20`,
                      color: platforms.find(p => p.id === contest.platform)?.color || '#8B5CF6'
                    }}
                  >
                    {contest.host}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Starts in</div>
                  <div className="text-sm font-medium text-yellow-400">
                    {getTimeUntilContest(contest.startTime)}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {contest.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="mr-2" size={16} />
                  <span>{contest.startTime.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-300">
                  <Clock className="mr-2" size={16} />
                  <span>{Math.floor(contest.duration / 60)}h {Math.floor(contest.duration % 60)}m</span>
                </div>
              </div>

              <a
                href={contest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors group"
              >
                <span>Join Contest</span>
                <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Trophy className="mx-auto mb-4 text-gray-600" size={48} />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No contests found</h3>
            <p className="text-gray-500">
              {selectedPlatform === 'all' 
                ? "Looks like there are no upcoming contests...👁️👁️" 
                : `No upcoming contests for ${platforms.find(p => p.id === selectedPlatform)?.name}`
              }
            </p>
          </motion.div>
        )}
      </motion.div>

      {filteredContests.length > 0 && (
        <motion.div 
          className="mt-8 bg-gray-800/40 border border-gray-700 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Calendar className="mr-3 text-blue-400" size={24} />
            Contest Timeline
          </h2>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            <div className="space-y-4">
              {filteredContests.slice(0, 5).map((contest, index) => (
                <div key={contest.id} className="relative flex items-center">
                  <div 
                    className="absolute left-2 w-4 h-4 rounded-full border-2 border-gray-900"
                    style={{ backgroundColor: platforms.find(p => p.id === contest.platform)?.color || '#8B5CF6' }}
                  ></div>
                  <div className="ml-12 bg-gray-700/50 rounded-lg p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{contest.title}</h4>
                        <p className="text-sm text-gray-400">{contest.host}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white">
                          {contest.startTime.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {getTimeUntilContest(contest.startTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Contests
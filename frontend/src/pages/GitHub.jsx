import React, { useEffect, useState } from 'react'
import { useUserStore } from '../zustand/store'
import { useGithubData } from '../hooks/useGithubData'
import { useGitHubStats } from '../hooks/useGitHubStats'
import GitRepos from '../layouts/GitRepos'
import RepoCard from '../components/github/RepoCard'
import GitProfile from '../components/github/GitProfile'
import NetworkNotification from '../components/NetworkNotification'
import { 
  LanguageChart, 
  ActivityChart, 
  RepoStatsChart, 
  TrendingRepos 
} from '../components/charts/SimpleCharts'
import { motion } from 'framer-motion'
import { Github, GitBranch, Star, Users, BookOpen, TrendingUp } from 'lucide-react'

const GitHub = () => {
  const { github } = useUserStore()
  const { data, loading, error } = useGithubData(github)
  const { stats, activity, trending, loading: statsLoading, error: statsError } = useGitHubStats(github)
  const [showNotification, setShowNotification] = useState(false)
  
  useEffect(() => {
    if (error || statsError) {
      setShowNotification(true)
    }
  }, [error, statsError])
  
  if (loading || !data) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading GitHub data...</p>
      </div>
    </div>
  )

  
  const languages = data.repos.reduce((acc, repo) => {
    if (repo.languages && typeof repo.languages === 'object') {
      Object.entries(repo.languages).forEach(([lang, bytes]) => {
        if (lang && typeof bytes === 'number') {
          acc[lang] = (acc[lang] || 0) + bytes
        }
      })
    }
    return acc
  }, {})

  return (
    <div className='min-h-screen bg-transparent p-2 sm:p-4 md:p-6'>
      <NetworkNotification 
        message={error || statsError || (data?.warning && `Data partially loaded: ${data.warning}`)}
        type={error || statsError ? 'error' : 'warning'}
        onDismiss={() => setShowNotification(false)}
      />
      
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-3 sm:mb-4">
          <Github className="mr-2 sm:mr-3 text-purple-400" size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">GitHub Dashboard</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400">
          Comprehensive overview of your GitHub activity and repository statistics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        <motion.div 
          className="xl:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GitProfile 
            profile={data.profile} 
            loading={loading} 
            stars={data.stars} 
            forks={data.forks} 
            langData={languages} 
          />
        </motion.div>

        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
              <BookOpen className="mx-auto mb-2 sm:mb-3 text-blue-400" size={16} />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{data.repos.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Repositories</div>
            </div>
            
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
              <Star className="mx-auto mb-2 sm:mb-3 text-yellow-400" size={16} />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{data.stars}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Stars</div>
            </div>
            
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
              <GitBranch className="mx-auto mb-2 sm:mb-3 text-green-400" size={16} />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{data.forks}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Forks</div>
            </div>
            
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
              <Users className="mx-auto mb-2 sm:mb-3 text-purple-400" size={16} />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{data.profile.followers}</div>
              <div className="text-xs sm:text-sm text-gray-400">Followers</div>
            </div>
          </motion.div>

          {!statsLoading && stats && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <LanguageChart languageData={languages} />
              <RepoStatsChart stats={stats} />
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {!statsLoading && activity && (
              <ActivityChart activityData={activity} />
            )}
            
            {!statsLoading && trending && (
              <TrendingRepos trendingData={trending} />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
                <BookOpen className="mr-2 sm:mr-3 text-blue-400" size={20} />
                All Repositories
              </h2>
              <GitRepos repos={data.repos} />
            </div>
          </motion.div>
        </div>
      </div>

      {statsLoading && (
        <motion.div 
          className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 sm:p-6 animate-pulse">
              <div className="h-3 sm:h-4 bg-gray-700 rounded w-1/4 mb-3 sm:mb-4"></div>
              <div className="h-36 sm:h-48 bg-gray-700 rounded"></div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default GitHub
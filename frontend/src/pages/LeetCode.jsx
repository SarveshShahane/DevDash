import React, { useEffect, useState } from 'react'
import { useLeetCodeData } from '../hooks/useLeetCodeData'
import { useLeetCodeStats } from '../hooks/useLeetCodeStats'
import { useLeetCodeStore } from '../zustand/store'
import LeetCodeProfile from '../components/leetcode/LeetCodeProfile'
import RecentSubmissions from '../components/leetcode/RecentSubmissions'
import { useUserStore } from '../zustand/store'
import {
  DifficultyChart,
  SubmissionHeatmap,
  ContestProgressChart,
  TopicChart,
  DailyChallengeCard
} from '../components/charts/SimpleLeetCodeCharts'
import { motion } from 'framer-motion'
import { Trophy, Star, Award, Code, Hash, Monitor, Users, GitPullRequest, Target, Calendar, TrendingUp } from 'lucide-react';

const LeetCode = () => {
  const { leetcode } = useUserStore()
  const { data, loading } = useLeetCodeData(leetcode)
  const { calendar, contests, topics, dailyChallenge, loading: statsLoading } = useLeetCodeStats(leetcode)
  const { leetCodeData } = useLeetCodeStore()
  
  if (!data || loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading LeetCode data...</p>
      </div>
    </div>
  )

  if (!leetCodeData || !leetCodeData.totalProblems) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading LeetCode data...</div>
      </div>
    );
  }

  const badges = leetCodeData?.badges || [];

  const problemAnalysis = [
    {
      difficulty: 'All',
      total: leetCodeData.totalProblems.easy + leetCodeData.totalProblems.medium + leetCodeData.totalProblems.hard,
      solved: leetCodeData.submitStats[0]?.count,
      color: '#60a5fa',
      icon: <Monitor size={14} />
    },
    {
      difficulty: 'Easy',
      total: leetCodeData.totalProblems.easy,
      solved: leetCodeData.submitStats[1]?.count,
      beats: leetCodeData.solvingBeat[0]?.percentage.toFixed(2),
      color: '#4ade80',
      icon: <GitPullRequest size={14} />
    },
    {
      difficulty: 'Medium',
      total: leetCodeData.totalProblems.medium,
      solved: leetCodeData.submitStats[2]?.count,
      beats: leetCodeData.solvingBeat[1]?.percentage?.toFixed(2),
      color: '#fbbf24',
      icon: <Code size={14} />
    },
    {
      difficulty: 'Hard',
      total: leetCodeData.totalProblems.hard,
      solved: leetCodeData.submitStats[3]?.count,
      beats: leetCodeData.solvingBeat[2]?.percentage?.toFixed(2),
      color: '#f87171',
      icon: <Users size={14} />
    }
  ]
  
  const contestInfo = leetCodeData.userContestRanking === null ? null : {
    attended: leetCodeData.userContestRanking?.attendedContestsCount || 0,
    badge: leetCodeData.userContestRanking?.badge,
    globalRank: leetCodeData.userContestRanking?.globalRanking || 0,
    rating: leetCodeData.userContestRanking?.rating?.toFixed(2) || 0,
    top: leetCodeData.userContestRanking?.topPercentage?.toFixed(2) || 0,
  }

  const totalSolved = leetCodeData.submitStats[0]?.count
  const totalProblems = leetCodeData.totalProblems.easy + leetCodeData.totalProblems.medium + leetCodeData.totalProblems.hard;
  const solveRate = ((totalSolved / totalProblems) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-900 p-2 sm:p-4 md:p-6">
      <motion.div 
        className="mb-6 md:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
          <div className="flex items-center">
            <Code className="mr-2 sm:mr-3 text-orange-400" size={28} />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">LeetCode Dashboard</h1>
          </div>
        </div>
        <p className="text-gray-400 text-sm sm:text-base">
          Track your coding progress, contest performance, and problem-solving journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        <motion.div 
          className="lg:col-span-1 order-first lg:order-first"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <LeetCodeProfile />
        </motion.div>

        <div className="lg:col-span-3 xl:col-span-3 space-y-4 md:space-y-6 order-last lg:order-last">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
              <Target className="mx-auto mb-2 md:mb-3 text-green-400" size={20} />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{totalSolved}</div>
              <div className="text-xs sm:text-sm text-gray-400">Problems Solved</div>
            </div>
            
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
              <TrendingUp className="mx-auto mb-2 md:mb-3 text-blue-400" size={20} />
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{solveRate}%</div>
              <div className="text-xs sm:text-sm text-gray-400">Completion Rate</div>
            </div>
            
            {contestInfo && (
              <>
                <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
                  <Trophy className="mx-auto mb-2 md:mb-3 text-yellow-400" size={20} />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{contestInfo.rating}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Contest Rating</div>
                </div>
                
                <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 sm:p-4 md:p-6 text-center">
                  <Award className="mx-auto mb-2 md:mb-3 text-purple-400" size={20} />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">#{contestInfo.globalRank.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Global Rank</div>
                </div>
              </>
            )}
          </motion.div>

          {!statsLoading && dailyChallenge && (
            <DailyChallengeCard dailyChallenge={dailyChallenge} />
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-base sm:text-lg font-medium text-gray-100 mb-3 md:mb-4 flex items-center">
              <Code className="mr-2 text-indigo-400" size={18} />
              Problem Solving Progress
            </h2>
            
            <div className="border border-gray-700 rounded-xl bg-gray-800/40 p-3 md:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
                {problemAnalysis.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className='bg-gray-800 rounded-lg p-3 md:p-4 shadow-md border border-gray-700 hover:border-gray-600 transition-all'
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <span className="h-5 w-5 md:h-6 md:w-6 rounded-md flex items-center justify-center mr-2" style={{ backgroundColor: `${item.color}30` }}>
                          <span className="text-xs" style={{ color: item.color }}>{item.icon}</span>
                        </span>
                        <span className='font-medium text-white text-sm md:text-base'>{item.difficulty}</span>
                      </div>
                      <span className='text-xs md:text-sm py-1 px-2 rounded-full bg-gray-700'>{item.solved}/{item.total}</span>
                    </div>
                    
                    <div className="h-2 md:h-2.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        style={{
                          backgroundColor: item.color
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((item.solved / item.total) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className='h-full rounded-full'
                      />
                    </div>
                    
                    {item.difficulty !== 'All' && (
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Beats:</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ 
                          backgroundColor: `${item.color}20`, 
                          color: item.color 
                        }}>
                          {item.beats}%
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {!statsLoading && leetCodeData && (
              <DifficultyChart 
                problemStats={{
                  ...leetCodeData.submitStats,
                  totalProblems: leetCodeData.totalProblems
                }} 
              />
            )}

            {!statsLoading && calendar && (
              <SubmissionHeatmap calendarData={calendar} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {!statsLoading && contests && contests.length > 0 && (
              <ContestProgressChart contestHistory={contests} />
            )}

            {!statsLoading && topics && (
              <TopicChart topicData={topics} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {contestInfo && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="border border-gray-700 rounded-xl bg-gray-800/40 p-4 md:p-6 h-full">
                  <h2 className="text-base sm:text-lg font-medium text-gray-100 mb-4 flex items-center">
                    <Trophy className="mr-2 text-amber-400" size={18} />
                    Contest Performance
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                    <div className="bg-gray-800 rounded-lg p-2 md:p-3 border border-gray-700">
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Hash className="mr-1.5" size={12} />
                        <span>Rating</span>
                      </div>
                      <div className="text-lg md:text-xl font-medium text-amber-400">
                        {contestInfo.rating}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-2 md:p-3 border border-gray-700">
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Award className="mr-1.5" size={12} />
                        <span>Ranking</span>
                      </div>
                      <div className="text-lg md:text-xl font-medium text-indigo-400">
                        #{contestInfo.globalRank.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-2 md:p-3 border border-gray-700">
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Star className="mr-1.5" size={12} />
                        <span>Top Percentile</span>
                      </div>
                      <div className="text-lg md:text-xl font-medium text-emerald-400">
                        {contestInfo.top}%
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-2 md:p-3 border border-gray-700">
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Code className="mr-1.5" size={12} />
                        <span>Contests</span>
                      </div>
                      <div className="text-lg md:text-xl font-medium text-sky-400">
                        {contestInfo.attended}
                      </div>
                    </div>
                  </div>
                  
                  {contestInfo.badge && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-amber-900/30 to-amber-800/10 border border-amber-700/30 rounded-lg p-3 md:p-4 flex items-center"
                    >
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-amber-800/30 flex items-center justify-center mr-3 md:mr-4 shadow-lg shadow-amber-900/20">
                        <Trophy size={20} className="text-amber-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-amber-400 text-sm md:text-lg">
                          {contestInfo.badge.name}
                        </div>
                        <div className="text-xs md:text-sm text-gray-300">
                          Top {contestInfo.top}% of participants worldwide
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="border border-gray-700 rounded-xl bg-gray-800/40 p-4 md:p-6 h-full">
                <h2 className="text-base sm:text-lg font-medium text-gray-100 mb-4 flex items-center">
                  <Award className="mr-2 text-sky-400" size={18} />
                  Achievement Badges
                </h2>
                
                {badges && badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {badges.slice(0, 4).map((badge, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx + 0.5 }}
                        className="bg-gray-800 rounded-lg p-2 md:p-3 border border-gray-700 hover:border-gray-600 transition-all flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-900/40 to-indigo-900/20 flex items-center justify-center mb-2 shadow-md">
                          {badge.icon ? (
                            <img src={badge.icon} alt={badge.name} className="w-5 h-5 md:w-6 md:h-6" />
                          ) : (
                            <Star size={14} className="text-sky-400" />
                          )}
                        </div>
                        <div className="text-xs md:text-sm text-center font-medium text-white">
                          {badge.displayName || badge.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-10 px-4 bg-gray-800 rounded-lg border border-gray-700">
                    <Award size={28} className="text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-xs md:text-sm">
                      No badges earned yet. Participate in contests and challenges to earn badges.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className='mt-4 md:mt-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <RecentSubmissions />
          </motion.div>
        </div>
      </div>

      {statsLoading && (
        <motion.div 
          className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 md:p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-32 md:h-48 bg-gray-700 rounded"></div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default LeetCode
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { 
  Github, 
  Star,
  GitFork,
  Users,
  Activity,
  Code,
  Trophy,
  Target,
  CheckSquare,
  ListChecks,
  Link,
  ExternalLink,
  Clock,
  ChevronRight,
  LineChart,
  Layers,
  FileCode,
  Sparkles,
  Flame
} from 'lucide-react'
import { useUserStore, todoStore, useVaultStore } from '../zustand/store'
import { useGithubData } from '../hooks/useGithubData'
import { useLeetCodeData } from '../hooks/useLeetCodeData'

const Dashboard = () => {
  const [reducedMotion, toggleReducedMotion] = useReducedMotion();
  
  const { github: rawGithubUsername, leetcode: rawLeetcodeUsername } = useUserStore()

  const githubUsername = rawGithubUsername || 'test-github-user'
  const leetcodeUsername = rawLeetcodeUsername || 'test-leetcode-user'
  
  const { data: githubData, loading: githubLoading, error: githubError } = useGithubData(githubUsername)
  
  const { data: leetcodeData, loading: leetcodeLoading } = useLeetCodeData(leetcodeUsername)
  const { todos, playerStats } = todoStore()
  
  const { links, codeSnippets } = useVaultStore()
  
  const hasGithubUsername = Boolean(rawGithubUsername)
  const hasLeetcodeUsername = Boolean(rawLeetcodeUsername)
  
  const githubStats = {
    repos: githubData?.profile?.public_repos || githubData?.public_repos || githubData?.totalRepos || 0,
    stars: githubData?.stars || githubData?.profile?.stargazers_count || githubData?.stargazers_count || githubData?.totalStars || 0,
    followers: githubData?.profile?.followers || githubData?.followers || 0
  }
  
  const extractLeetCodeStats = () => {
    if (!leetcodeData) return {
      solved: 0,
      ranking: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0
    };

    console.log(leetcodeData)
    return {
      solved: leetcodeData.totalSolved || 0,
      ranking: leetcodeData.profile?.ranking || 0,
      easySolved: leetcodeData.easySolved || 0,
      mediumSolved: leetcodeData.mediumSolved || 0,
      hardSolved: leetcodeData.hardSolved || 0
    };
  };
  
  const leetcodeStats = extractLeetCodeStats()

  const bothServicesConfigured = hasGithubUsername && hasLeetcodeUsername;
  const totalSolved=leetcodeData?.easySolved+leetcodeData?.mediumSolved+leetcodeData?.hardSolved

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={!reducedMotion ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Developer Dashboard
            </h1>
            <p className="text-gray-400 text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              Comprehensive coding activity overview
              <button 
                onClick={toggleReducedMotion}
                className={`self-start sm:self-auto px-2 py-0.5 text-xs rounded-full transition-colors ${
                  reducedMotion 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-gray-700/50 text-gray-300 border border-gray-600/30'
                }`}
                title="Toggle reduced motion mode for better visual comfort"
              >
                {reducedMotion ? 'Reduced Motion: On' : 'Reduced Motion: Off'}
              </button>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
            <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg px-3 sm:px-4 py-2 flex items-center min-w-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-blue-900/30 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Total Projects</p>
                <p className="text-sm sm:text-lg font-semibold text-white">{githubStats.repos || 0}</p>
              </div>
            </div>
            
            <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg px-3 sm:px-4 py-2 flex items-center min-w-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-green-900/30 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Solved Problems</p>
                <p className="text-sm sm:text-lg font-semibold text-white">{leetcodeStats.solved || 0}</p>
              </div>
            </div>
            
            <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg px-3 sm:px-4 py-2 flex items-center min-w-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-purple-900/30 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Tasks Completed</p>
                <p className="text-sm sm:text-lg font-semibold text-white">{playerStats.totalCompleted || 0}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {githubError && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-200 text-sm">Error loading GitHub data: {githubError}</p>
          </div>
        )}

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 mb-6 text-xs backdrop-blur-sm">
          <p className="text-gray-300 mb-2 font-medium">API Connection Status:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-4">
            <div className="break-all sm:break-normal">
              <p className="text-gray-400 flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                  !hasGithubUsername ? 'bg-gray-500' : 
                  githubLoading ? 'bg-yellow-500 animate-pulse' : 
                  githubData ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span className="min-w-0">
                  GitHub: {hasGithubUsername ? 
                    (githubLoading ? 'Loading...' : 
                      (githubData ? `${githubUsername} (${githubStats.repos} repos)` : 'Failed to load data')) : 
                    'Not configured'}
                </span>
              </p>
            </div>
            <div className="break-all sm:break-normal">
              <p className="text-gray-400 flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                  !hasLeetcodeUsername ? 'bg-gray-500' : 
                  leetcodeLoading ? 'bg-yellow-500 animate-pulse' : 
                  leetcodeData ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span className="min-w-0">
                  LeetCode: {hasLeetcodeUsername ? 
                    (leetcodeLoading ? 'Loading...' : 
                      (leetcodeData ? 
                       <>
                         <span className="font-medium">{leetcodeUsername}</span>
                         <span> ({totalSolved} solved </span>
                         <span className="text-green-400">{leetcodeStats.easySolved}</span>
                         <span>/</span>
                         <span className="text-yellow-400">{leetcodeStats.mediumSolved}</span>
                         <span>/</span>
                         <span className="text-red-400">{leetcodeStats.hardSolved}</span>
                         <span>)</span>
                       </> : 'Failed to load data')) : 
                    'Not configured'}
                </span>
              </p>
            </div>
          </div>
        </div>
        
       
        <motion.div
          initial={!reducedMotion ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.4, delay: reducedMotion ? 0 : 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/20 border border-purple-800/30 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-lg shadow-purple-900/10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="text-purple-400" size={16} />
                Developer Progress
              </h2>
              <div className="bg-purple-800/30 text-purple-300 text-xs px-2 py-1 rounded-md">
                Level {playerStats?.level || 1}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>XP Progress</span>
                <span>{playerStats?.xp || 0}/{playerStats?.xpToNextLevel || 100}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((playerStats?.xp || 0) / (playerStats?.xpToNextLevel || 100)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2">
              <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                <p className="text-xs text-gray-400">Tasks Completed</p>
                <p className="text-lg sm:text-xl font-bold text-white">{playerStats?.totalCompleted || 0}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                <p className="text-xs text-gray-400">Day Streak</p>
                <p className="text-lg sm:text-xl font-bold text-white flex items-center">
                  <Flame className="text-orange-400 mr-1" size={12} />
                  {playerStats?.streak || 0}
                </p>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-2">Achievements</div>
              <div className="flex flex-wrap gap-1">
                {playerStats?.achievements?.slice(0, 5).map((achievement, i) => (
                  <div 
                    key={i} 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-800/70 flex items-center justify-center text-sm sm:text-lg border border-gray-700/50"
                    title={achievement.name}
                  >
                    {achievement.icon}
                  </div>
                ))}
                {(playerStats?.achievements?.length || 0) > 5 && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-800/70 flex items-center justify-center text-xs border border-gray-700/50">
                    +{playerStats.achievements.length - 5}
                  </div>
                )}
                {!playerStats?.achievements?.length && (
                  <div className="text-xs text-gray-500 italic">No achievements yet</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-lg shadow-gray-900/20">
            <div className="flex justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <Github className="text-gray-300" size={16} />
                GitHub Summary
              </h2>
              {hasGithubUsername && !githubLoading && (
                <div className="flex items-center text-xs text-gray-400">
                  <img 
                    src={`https://github.com/${githubUsername}.png`}
                    alt="Profile"
                    className="w-4 h-4 rounded-full mr-1"
                  />
                  <span className="hidden sm:inline">{githubUsername}</span>
                </div>
              )}
            </div>
            
            {githubLoading ? (
              <div className="flex justify-center items-center h-20 sm:h-28">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
              </div>
            ) : !hasGithubUsername ? (
              <div className="flex flex-col items-center justify-center h-20 sm:h-28 text-center">
                <Github className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600 mb-2" />
                <p className="text-xs sm:text-sm text-gray-400">GitHub account not configured</p>
                <a href="/settings" className="text-xs text-blue-400 hover:underline mt-1">Configure now</a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50">
                    <p className="text-xs text-gray-400">Repositories</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{githubStats.repos}</p>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50">
                    <p className="text-xs text-gray-400">Stars</p>
                    <p className="text-lg sm:text-xl font-bold text-yellow-400 flex items-center">
                      <Star className="mr-1" size={12} />
                      {githubStats.stars}
                    </p>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50">
                    <p className="text-xs text-gray-400">Followers</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{githubStats.followers}</p>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-700/50">
                  <a 
                    href="/github" 
                    className="text-blue-400 text-xs sm:text-sm flex items-center hover:underline"
                  >
                    View detailed GitHub stats
                    <ChevronRight size={14} />
                  </a>
                </div>
              </>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-lg shadow-gray-900/20">
            <div className="flex justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <Code className="text-green-400" size={16} />
                LeetCode Summary
              </h2>
              {hasLeetcodeUsername && !leetcodeLoading && (
                <div className="text-xs text-gray-400">
                  <span className="hidden sm:inline">{leetcodeUsername}</span>
                </div>
              )}
            </div>
            
            {leetcodeLoading ? (
              <div className="flex justify-center items-center h-20 sm:h-28">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
              </div>
            ) : !hasLeetcodeUsername ? (
              <div className="flex flex-col items-center justify-center h-20 sm:h-28 text-center">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600 mb-2" />
                <p className="text-xs sm:text-sm text-gray-400">LeetCode account not configured</p>
                <a href="/settings" className="text-xs text-blue-400 hover:underline mt-1">Configure now</a>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">Problems Solved</div>
                  <p className="text-2xl sm:text-3xl font-bold">{leetcodeStats.solved || 0}</p>
                  <div className="flex gap-1 sm:gap-2 mt-2">
                    <div className="flex items-center text-xs">
                      <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-green-400 font-medium">{leetcodeStats.easySolved}</span>
                      <span className="text-gray-400 ml-1 hidden sm:inline">Easy</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></span>
                      <span className="text-yellow-400 font-medium">{leetcodeStats.mediumSolved}</span>
                      <span className="text-gray-400 ml-1 hidden sm:inline">Medium</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="h-3 w-3 rounded-full bg-red-500 mr-1"></span>
                      <span className="text-red-400 font-medium">{leetcodeStats.hardSolved}</span>
                      <span className="text-gray-400 ml-1 hidden sm:inline">Hard</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-700/50">
                  <a 
                    href="/leetcode" 
                    className="text-green-400 text-xs sm:text-sm flex items-center hover:underline"
                  >
                    View detailed LeetCode stats
                    <ChevronRight size={14} />
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            initial={!reducedMotion ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-gray-950/30">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                  <ListChecks className="text-blue-400" size={18} />
                  Active Tasks
                </h2>
                <a href="/todo" className="text-xs text-blue-400 hover:underline flex items-center self-start sm:self-auto">
                  View all tasks <ChevronRight size={14} />
                </a>
              </div>
              
              {todos.filter(todo => !todo.isCompleted).length === 0 ? (
                <div className="text-center py-6 sm:py-8 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <CheckSquare size={28} className="mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400 text-sm">No active tasks</p>
                  <a href="/todo" className="text-sm text-blue-400 mt-2 inline-block hover:underline">
                    Create a new task
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos
                    .filter(todo => !todo.isCompleted)
                    .slice(0, 5)
                    .map((todo, index) => {
                      const priorityColors = {
                        low: "bg-green-500/20 text-green-400 border-green-500/30",
                        medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
                        high: "bg-orange-500/20 text-orange-400 border-orange-500/30", 
                        urgent: "bg-red-500/20 text-red-400 border-red-500/30"
                      };
                      
                      return (
                        <div 
                          key={todo.id || index}
                          className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50"
                        >
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs sm:text-sm ${priorityColors[todo.priority] || priorityColors.medium}`}>
                            {todo.priority === 'urgent' ? '!' : todo.priority === 'high' ? '↑' : todo.priority === 'low' ? '↓' : '-'}
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium text-white text-sm truncate">{todo.title}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center text-xs gap-1 sm:gap-3 mt-1">
                              <span className="text-gray-400 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {todo.estimatedTime || 30} min
                              </span>
                              <span className="text-gray-500 capitalize">{todo.category || 'general'}</span>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0">
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority] || priorityColors.medium}`}>
                              {todo.priority}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {todos.filter(todo => !todo.isCompleted).length > 5 && (
                      <a 
                        href="/todo" 
                        className="block text-center py-2 bg-gray-800/50 hover:bg-gray-700/50 text-sm text-blue-400 rounded-lg transition-colors"
                      >
                        + {todos.filter(todo => !todo.isCompleted).length - 5} more tasks
                      </a>
                    )}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-gray-950/20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                    <Github className="text-purple-400" size={16} />
                    GitHub Stats
                  </h2>
                </div>
                
                {!hasGithubUsername ? (
                  <div className="text-center py-4 sm:py-5">
                    <Github className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-600 mb-2" />
                    <p className="text-xs sm:text-sm text-gray-400">Not configured</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 border border-gray-700/50">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        <GitFork className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                        <h3 className="text-gray-300 text-xs sm:text-sm">Repositories</h3>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {githubLoading ? "..." : githubStats.repos}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 border border-gray-700/50">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                        <h3 className="text-gray-300 text-xs sm:text-sm">Stars</h3>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-yellow-400">
                        {githubLoading ? "..." : githubStats.stars}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 border border-gray-700/50">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                        <h3 className="text-gray-300 text-xs sm:text-sm">Followers</h3>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {githubLoading ? "..." : githubStats.followers}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 border border-gray-700/50 flex items-center justify-center">
                      <a href="/github" className="text-purple-400 hover:underline text-xs sm:text-sm flex items-center">
                        View Details
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-gray-950/20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                    <Code className="text-green-400" size={16} />
                    LeetCode Stats
                  </h2>
                </div>
                
                {!hasLeetcodeUsername ? (
                  <div className="text-center py-4 sm:py-5">
                    <Code className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-600 mb-2" />
                    <p className="text-xs sm:text-sm text-gray-400">Not configured</p>
                  </div>
                ) : (
                  <div>
                    <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 border border-gray-700/50 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        <h3 className="text-gray-300 text-xs sm:text-sm">Problems Solved</h3>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {leetcodeLoading ? "..." : leetcodeStats.solved || "0"}
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 border border-gray-700/50 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1 sm:gap-2 mb-2">
                        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                        <h3 className="text-gray-300 text-xs sm:text-sm">Difficulty Mix</h3>
                      </div>
                      
                      {leetcodeLoading ? (
                        <div className="h-4 sm:h-5 w-full bg-gray-700 animate-pulse rounded"></div>
                      ) : (
                        <div className="flex gap-2">
                          <div className="text-center flex-1">
                            <p className="text-xs text-gray-400">Easy</p>
                            <p className="text-sm sm:text-base font-medium text-green-400">{leetcodeStats.easySolved || 0}</p>
                          </div>
                          <div className="text-center flex-1">
                            <p className="text-xs text-gray-400">Med</p>
                            <p className="text-sm sm:text-base font-medium text-yellow-400">{leetcodeStats.mediumSolved || 0}</p>
                          </div>
                          <div className="text-center flex-1">
                            <p className="text-xs text-gray-400">Hard</p>
                            <p className="text-sm sm:text-base font-medium text-red-400">{leetcodeStats.hardSolved || 0}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center">
                      <a href="/leetcode" className="text-green-400 hover:underline text-xs sm:text-sm flex items-center">
                        View Details
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {(!hasGithubUsername || !hasLeetcodeUsername) && (
              <div className="space-y-4">
                {!hasGithubUsername && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800/50 border border-purple-500/40 rounded-lg p-4 text-center backdrop-blur-md shadow-lg shadow-purple-900/10"
                  >
                    <Github className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <h3 className="text-purple-300 font-semibold mb-2">Setup GitHub Profile</h3>
                    <p className="text-gray-300 mb-3 text-sm">Connect your GitHub account to view activity stats</p>
                    <button 
                      onClick={() => window.location.href = '/settings'}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 text-sm rounded-lg transition-colors"
                    >
                      Configure
                    </button>
                  </motion.div>
                )}
                
                {!hasLeetcodeUsername && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-800/50 border border-green-500/40 rounded-lg p-4 text-center backdrop-blur-md shadow-lg shadow-green-900/10"
                  >
                    <Code className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h3 className="text-green-300 font-semibold mb-2">Setup LeetCode Profile</h3>
                    <p className="text-gray-300 mb-3 text-sm">Connect your LeetCode account to track problem-solving progress</p>
                    <button 
                      onClick={() => window.location.href = '/settings'}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 text-sm rounded-lg transition-colors"
                    >
                      Configure
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={!reducedMotion ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.5, delay: reducedMotion ? 0 : 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-gray-950/20">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <Link className="text-blue-400" size={16} />
                  Resource Links
                </h2>
                <a href="/devkit" className="text-xs text-blue-400 hover:underline flex items-center self-start sm:self-auto">
                  View all <ChevronRight size={14} />
                </a>
              </div>
              
              {links.length === 0 ? (
                <div className="text-center py-6 sm:py-8 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <Link size={24} className="mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400 text-sm">No links saved</p>
                  <a href="/devkit" className="text-sm text-blue-400 mt-2 inline-block hover:underline">
                    Add your first link
                  </a>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {links.slice(0, 5).map((link, index) => {
                    const priorityColors = {
                      high: "border-l-red-500",
                      medium: "border-l-yellow-500",
                      normal: "border-l-blue-500",
                      low: "border-l-green-500"
                    };
                    
                    return (
                      <a 
                        key={link.id || index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center p-2 pl-3 bg-gray-800/40 rounded-lg border border-gray-700/50 border-l-4 ${priorityColors[link.priority] || 'border-l-blue-500'} hover:bg-gray-700/40 transition-colors group`}
                      >
                        <div className="flex-grow min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">{link.title}</h4>
                          <p className="text-xs text-gray-400 truncate">{link.description}</p>
                        </div>
                        <ExternalLink size={14} className="text-gray-500 group-hover:text-blue-400 ml-2 flex-shrink-0" />
                      </a>
                    );
                  })}
                  
                  {links.length > 5 && (
                    <a 
                      href="/devkit" 
                      className="block text-center py-2 bg-gray-800/50 hover:bg-gray-700/50 text-sm text-blue-400 rounded-lg transition-colors"
                    >
                      + {links.length - 5} more resources
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-gray-950/20">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <FileCode className="text-purple-400" size={16} />
                  Code Snippets
                </h2>
                <a href="/devkit" className="text-xs text-purple-400 hover:underline flex items-center self-start sm:self-auto">
                  View all <ChevronRight size={14} />
                </a>
              </div>
              
              {codeSnippets.length === 0 ? (
                <div className="text-center py-6 sm:py-8 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <FileCode size={24} className="mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400 text-sm">No code snippets saved</p>
                  <a href="/devkit" className="text-sm text-purple-400 mt-2 inline-block hover:underline">
                    Add your first snippet
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {codeSnippets.slice(0, 3).map((snippet, index) => (
                    <div 
                      key={snippet.id || index}
                      className="bg-gray-800/70 rounded-lg border border-gray-700/50 overflow-hidden"
                    >
                      <div className="px-3 py-2 bg-gray-900/70 border-b border-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0" style={{ 
                            backgroundColor: snippet.language === 'javascript' ? '#f7df1e' : 
                              snippet.language === 'python' ? '#3776ab' : 
                              snippet.language === 'html' ? '#e34c26' : 
                              snippet.language === 'css' ? '#264de4' : 
                              snippet.language === 'java' ? '#007396' : 
                              '#6e6e73'
                          }}></span>
                          <span className="text-xs font-medium text-gray-300 truncate">{snippet.title}</span>
                        </div>
                        <span className="text-xs text-gray-500 capitalize flex-shrink-0 ml-2">{snippet.language || 'text'}</span>
                      </div>
                      <div className="p-3">
                        <pre className="text-xs text-gray-300 whitespace-pre-wrap line-clamp-2 font-mono overflow-hidden">{snippet.code}</pre>
                      </div>
                    </div>
                  ))}
                  
                  {codeSnippets.length > 3 && (
                    <a 
                      href="/devkit" 
                      className="block text-center py-2 bg-gray-800/50 hover:bg-gray-700/50 text-sm text-purple-400 rounded-lg transition-colors"
                    >
                      + {codeSnippets.length - 3} more snippets
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-gray-950/20">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <LineChart className="text-teal-400" size={16} />
                  Activity Summary
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-800/70 rounded-lg p-3 border border-gray-700/50">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Todo Completion</p>
                      <p className="text-base sm:text-lg font-bold text-white">
                        {Math.round((playerStats?.totalCompleted || 0) / (todos.length || 1) * 100)}%
                        <span className="text-xs text-gray-400 ml-1 font-normal">
                          ({playerStats?.totalCompleted || 0}/{todos.length || 0})
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Links Saved</p>
                      <p className="text-base sm:text-lg font-bold text-white">{links.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/70 rounded-lg p-3 border border-gray-700/50">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Snippets</p>
                      <p className="text-base sm:text-lg font-bold text-white">{codeSnippets.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Activity Streak</p>
                      <p className="text-base sm:text-lg font-bold text-white flex items-center">
                        <Flame className="text-orange-400 mr-1" size={12} />
                        {playerStats?.streak || 0} days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          {!hasGithubUsername && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/60 border border-purple-500/40 rounded-lg p-6 text-center"
            >
              <Github className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-purple-300 font-semibold mb-2">Setup GitHub Profile</h3>
              <p className="text-gray-300 mb-4">Connect your GitHub account to view activity stats</p>
              <button 
                onClick={() => window.location.href = '/settings'}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Configure
              </button>
            </motion.div>
          )}
          
          {!hasLeetcodeUsername && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/60 border border-green-500/40 rounded-lg p-6 text-center"
            >
              <Code className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-300 font-semibold mb-2">Setup LeetCode Profile</h3>
              <p className="text-gray-300 mb-4">Connect your LeetCode account to track problem-solving progress</p>
              <button 
                onClick={() => window.location.href = '/settings'}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Configure
              </button>
            </motion.div>
          )}
        </div>

        {(hasGithubUsername || hasLeetcodeUsername) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-200 mb-3 sm:mb-4">Profiles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {hasGithubUsername && (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                  {githubLoading ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                  ) : (
                    <img
                      src={githubData?.profile?.avatar_url || githubData?.avatar_url || githubData?.avatar || `https://github.com/${githubUsername}.png`}
                      alt={githubData?.profile?.username || githubData?.profile?.login || githubData?.login || githubUsername}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-500 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-md font-semibold text-white truncate">{githubUsername}</h3>
                    <a 
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-purple-400 text-xs sm:text-sm hover:underline flex items-center mt-1"
                    >
                      <Github className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">View GitHub Profile</span>
                    </a>
                  </div>
                </div>
              )}
              
              {hasLeetcodeUsername && (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-green-500 flex items-center justify-center bg-gray-900 flex-shrink-0">
                    <img
                      src={leetcodeData?.profile?.userAvatar || leetcodeData?.avatar_url || leetcodeData?.avatar || `https://leetcode.com/${leetcodeUsername}.png`}
                      alt={leetcodeData?.profile?.username || leetcodeData?.profile?.login || leetcodeData?.login || leetcodeUsername}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-green-500 flex-shrink-0"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-md font-semibold text-white truncate">{leetcodeUsername}</h3>
                    <a 
                      href={`https://leetcode.com/${leetcodeUsername}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-green-400 text-xs sm:text-sm hover:underline flex items-center mt-1"
                    >
                      <Code className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">View LeetCode Profile</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {bothServicesConfigured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-200 mb-3 sm:mb-4">Explore More</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="/github"
                className="block p-4 sm:p-6 bg-gray-800 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                  <h3 className="text-gray-200 font-medium text-sm sm:text-base">GitHub Details</h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  View detailed GitHub statistics, repositories and activity
                </p>
              </a>
              
              <a 
                href="/leetcode"
                className="block p-4 sm:p-6 bg-gray-800 rounded-xl border border-green-500/30 hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                  <h3 className="text-gray-200 font-medium text-sm sm:text-base">LeetCode Details</h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  View detailed LeetCode statistics, problem-solving history and submissions
                </p>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
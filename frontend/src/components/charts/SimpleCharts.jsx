import React from 'react';
import { motion } from 'framer-motion';
import { languageColors } from '../../utils/segmentColors';

export const LanguageChart = ({ languageData }) => {
  if (!languageData || typeof languageData !== 'object' || Object.keys(languageData).length === 0) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          Language Distribution
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p>No language data available</p>
        </div>
      </motion.div>
    );
  }

  const totalBytes = Object.values(languageData).reduce((a, b) => a + (b || 0), 0);
  
  if (totalBytes === 0) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          Language Distribution
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p>No language data available</p>
        </div>
      </motion.div>
    );
  }

  const data = Object.entries(languageData).map(([language, bytes]) => ({
    name: language,
    value: bytes || 0,
    percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : '0.0'
  })).sort((a, b) => b.value - a.value);

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
        Language Distribution
      </h3>
      
      <div className="space-y-4">
        {data.slice(0, 6).map((lang, index) => (
          <motion.div
            key={lang.name}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: languageColors[lang.name] || '#8884d8' }}
              />
              <span className="text-white font-medium">{lang.name}</span>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: languageColors[lang.name] || '#8884d8' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
            
            <span className="text-gray-300 text-sm font-medium min-w-[50px] text-right">
              {lang.percentage}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const ActivityChart = ({ activityData }) => {
  if (!activityData || !Array.isArray(activityData) || activityData.length === 0) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Repository Activity</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Activity data not available</p>
        </div>
      </motion.div>
    );
  }

  const chartData = activityData.map((repo) => ({
    name: repo.repo || 'Unknown',
    commits: Array.isArray(repo.stats) ? repo.stats.reduce((sum, week) => sum + (week.total || 0), 0) : 0
  })).slice(0, 8);

  const maxCommits = Math.max(...chartData.map(d => d.commits), 1);

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        Repository Activity
      </h3>
      
      <div className="space-y-3">
        {chartData.map((repo, index) => (
          <motion.div
            key={repo.name}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-20 text-sm text-gray-300 truncate" title={repo.name}>
              {repo.name}
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${maxCommits > 0 ? (repo.commits / maxCommits) * 100 : 0}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                >
                  <span className="text-white text-xs font-medium">
                    {repo.commits}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const RepoStatsChart = ({ stats }) => {
  if (!stats || typeof stats !== 'object') {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
          Repository Overview
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p>Statistics not available</p>
        </div>
      </motion.div>
    );
  }

  const data = [
    { name: 'Original', value: stats.originalRepos || 0, color: '#3B82F6' },
    { name: 'Forked', value: stats.forkedRepos || 0, color: '#8B5CF6' }
  ];

  const summaryData = [
    { metric: 'Total Stars', value: stats.totalStars || 0, icon: '⭐', color: '#FCD34D' },
    { metric: 'Total Forks', value: stats.totalForks || 0, icon: '🍴', color: '#8B5CF6' },
    { metric: 'Total Watchers', value: stats.totalWatchers || 0, icon: '👁️', color: '#10B981' },
    { metric: 'Total Repos', value: stats.totalRepos || 0, icon: '📁', color: '#3B82F6' }
  ];

  const total = (stats.originalRepos || 0) + (stats.forkedRepos || 0);

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
        Repository Overview
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-700/50 rounded-lg p-4 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">{item.metric}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium text-white mb-3">Repository Types</h4>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-300 flex-1">{item.name}</span>
                <span className="text-white font-medium">{item.value}</span>
                <span className="text-gray-400 text-sm">
                  ({total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-white mb-3">Top Languages</h4>
          <div className="space-y-2">
            {Object.entries(stats.languageStats || {})
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([language, count], index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: languageColors[language] || '#8884d8' }}
                    ></div>
                    <span className="text-gray-300 text-sm">{language}</span>
                  </div>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TrendingRepos = ({ trendingData }) => {
  if (!trendingData || !Array.isArray(trendingData) || trendingData.length === 0) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Trending Repositories</h3>
        <div className="text-center py-8 text-gray-400">
          <p>No trending repositories available</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
        Top Repositories
      </h3>
      <div className="space-y-4">
        {trendingData.map((repo, index) => (
          <motion.div
            key={index}
            className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-2">
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium text-lg"
              >
                {repo.name}
              </a>
              <div className="flex items-center space-x-3 text-sm">
                <span className="flex items-center text-yellow-400">
                  ⭐ {repo.stars}
                </span>
                <span className="flex items-center text-purple-400">
                  🍴 {repo.forks}
                </span>
              </div>
            </div>
            
            {repo.description && (
              <p className="text-gray-300 text-sm mb-2">{repo.description}</p>
            )}
            
            <div className="flex justify-between items-center">
              {repo.language && (
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${languageColors[repo.language] || '#8884d8'}20`,
                    color: languageColors[repo.language] || '#8884d8'
                  }}
                >
                  {repo.language}
                </span>
              )}
              <span className="text-xs text-gray-400">
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

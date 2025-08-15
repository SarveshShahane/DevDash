import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';
import { languageColors } from '../../utils/segmentColors';

export const LanguageChart = ({ languageData }) => {
  const data = Object.entries(languageData).map(([language, bytes]) => ({
    name: language,
    value: bytes,
    percentage: ((bytes / Object.values(languageData).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.payload.name}</p>
          <p className="text-gray-300 text-sm">{data.payload.percentage}%</p>
          <p className="text-gray-400 text-xs">{(data.value / 1024).toFixed(1)} KB</p>
        </div>
      );
    }
    return null;
  };

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
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={languageColors[entry.name] || '#8884d8'} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const ActivityChart = ({ activityData }) => {
  if (!activityData || activityData.length === 0) {
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

  const chartData = activityData.map((repo, index) => ({
    name: repo.repo,
    commits: repo.stats?.reduce((sum, week) => sum + week.total, 0) || 0
  }));

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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
          />
          <Bar dataKey="commits" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const RepoStatsChart = ({ stats }) => {
  const data = [
    { name: 'Original', value: stats.originalRepos, color: '#3B82F6' },
    { name: 'Forked', value: stats.forkedRepos, color: '#8B5CF6' }
  ];

  const summaryData = [
    { metric: 'Total Stars', value: stats.totalStars, icon: '⭐', color: '#FCD34D' },
    { metric: 'Total Forks', value: stats.totalForks, icon: '🍴', color: '#8B5CF6' },
    { metric: 'Total Watchers', value: stats.totalWatchers, icon: '👁️', color: '#10B981' },
    { metric: 'Total Repos', value: stats.totalRepos, icon: '📁', color: '#3B82F6' }
  ];

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
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-md font-medium text-white mb-3">Top Languages</h4>
          <div className="space-y-2">
            {Object.entries(stats.languageStats)
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
  if (!trendingData || trendingData.length === 0) {
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

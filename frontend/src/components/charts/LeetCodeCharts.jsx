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
  Line,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { motion } from 'framer-motion';

export const DifficultyChart = ({ problemStats }) => {
  const data = [
    {
      name: 'Easy',
      solved: problemStats[1]?.count || 0,
      total: problemStats.totalProblems?.easy || 0,
      color: '#4ADE80',
      percentage: problemStats[1]?.count ? ((problemStats[1].count / problemStats.totalProblems.easy) * 100).toFixed(1) : 0
    },
    {
      name: 'Medium',
      solved: problemStats[2]?.count || 0,
      total: problemStats.totalProblems?.medium || 0,
      color: '#FBBF24',
      percentage: problemStats[2]?.count ? ((problemStats[2].count / problemStats.totalProblems.medium) * 100).toFixed(1) : 0
    },
    {
      name: 'Hard',
      solved: problemStats[3]?.count || 0,
      total: problemStats.totalProblems?.hard || 0,
      color: '#F87171',
      percentage: problemStats[3]?.count ? ((problemStats[3].count / problemStats.totalProblems.hard) * 100).toFixed(1) : 0
    }
  ];

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        Problem Difficulty Breakdown
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#374151"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke={item.color}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - item.percentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{item.percentage}%</span>
              </div>
            </div>
            <h4 className="font-medium text-white">{item.name}</h4>
            <p className="text-sm text-gray-400">{item.solved}/{item.total}</p>
          </motion.div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
            formatter={(value, name) => [value, name === 'solved' ? 'Solved' : 'Total']}
          />
          <Bar dataKey="solved" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="total" fill="#374151" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const SubmissionHeatmap = ({ calendarData }) => {
  if (!calendarData || !calendarData.calendar) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Submission Activity</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Calendar data not available</p>
        </div>
      </motion.div>
    );
  }

  const getIntensityColor = (count) => {
    if (count === 0) return '#1F2937';
    if (count <= 2) return '#0F4C3A';
    if (count <= 5) return '#166534';
    if (count <= 10) return '#15803D';
    return '#16A34A';
  };

  const maxCount = Math.max(...calendarData.calendar.map(day => day.count));
  
  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        Submission Activity
      </h3>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>Streak: {calendarData.streak} days</span>
          <span>Total Active Days: {calendarData.totalActiveDays}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 3, 6, 10].map(count => (
              <div
                key={count}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getIntensityColor(count) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-53 gap-1 min-w-max">
          {calendarData.calendar.slice(-365).map((day, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-sm cursor-pointer"
              style={{ backgroundColor: getIntensityColor(day.count) }}
              whileHover={{ scale: 1.2 }}
              title={`${day.date}: ${day.count} submissions`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: index * 0.001 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ContestProgressChart = ({ contestHistory }) => {
  if (!contestHistory || contestHistory.length === 0) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Contest Progress</h3>
        <div className="text-center py-8 text-gray-400">
          <p>No contest history available</p>
        </div>
      </motion.div>
    );
  }

  const chartData = contestHistory.map((contest, index) => ({
    contest: index + 1,
    rating: contest.rating,
    ranking: contest.ranking,
    solved: contest.problemsSolved,
    total: contest.totalProblems,
    title: contest.title
  }));

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
        Contest Rating Progress
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="contest" 
            stroke="#9CA3AF"
            label={{ value: 'Contest Number', position: 'insideBottom', offset: -5 }}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
            formatter={(value, name, props) => {
              const data = props.payload;
              return [
                <div key="tooltip">
                  <p>Rating: {data.rating}</p>
                  <p>Rank: {data.ranking}</p>
                  <p>Solved: {data.solved}/{data.total}</p>
                  <p className="text-xs text-gray-400">{data.title}</p>
                </div>
              ];
            }}
            labelFormatter={() => ''}
          />
          <Line 
            type="monotone" 
            dataKey="rating" 
            stroke="#8B5CF6" 
            strokeWidth={3}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const TopicChart = ({ topicData }) => {
  if (!topicData || (!topicData.fundamental && !topicData.intermediate && !topicData.advanced)) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Topic Analysis</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Topic data not available</p>
        </div>
      </motion.div>
    );
  }

  const allTopics = [
    ...(topicData.fundamental || []).map(t => ({ ...t, level: 'Fundamental', color: '#4ADE80' })),
    ...(topicData.intermediate || []).map(t => ({ ...t, level: 'Intermediate', color: '#FBBF24' })),
    ...(topicData.advanced || []).map(t => ({ ...t, level: 'Advanced', color: '#F87171' }))
  ].sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 15);

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
        Top Problem Topics
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={allTopics} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis stroke="#9CA3AF" />
          <YAxis dataKey="tagName" stroke="#9CA3AF" tick={{ fontSize: 12 }} width={120} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
            formatter={(value, name, props) => [
              `${value} problems`,
              `${props.payload.level} Level`
            ]}
          />
          <Bar 
            dataKey="problemsSolved" 
            fill="#3B82F6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const DailyChallengeCard = ({ dailyChallenge }) => {
  if (!dailyChallenge) {
    return (
      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Daily Challenge</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Daily challenge not available</p>
        </div>
      </motion.div>
    );
  }

  const challenge = dailyChallenge.activeDailyCodingChallengeQuestion;
  const difficulty = challenge?.question?.difficulty;
  const difficultyColors = {
    Easy: '#4ADE80',
    Medium: '#FBBF24',
    Hard: '#F87171'
  };

  return (
    <motion.div 
      className="bg-gray-800/40 border border-gray-700 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
        Today's Challenge
      </h3>
      
      <div className="bg-gray-700/50 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-white">
            {challenge?.question?.frontendQuestionId}. {challenge?.question?.title}
          </h4>
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: `${difficultyColors[difficulty]}20`,
              color: difficultyColors[difficulty]
            }}
          >
            {difficulty}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Acceptance Rate: {challenge?.question?.acRate?.toFixed(1)}%</span>
            <span>Date: {new Date(challenge?.date).toLocaleDateString()}</span>
          </div>
          
          <a
            href={`https://leetcode.com${challenge?.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Solve Challenge
          </a>
        </div>

        {challenge?.question?.topicTags && challenge.question.topicTags.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {challenge.question.topicTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded-md"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

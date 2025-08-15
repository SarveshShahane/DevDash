import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Code, 
  Trophy, 
  Star, 
  TrendingUp, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

const DashboardOverview = () => {
  const features = [
    {
      icon: <Github className="text-purple-400" size={24} />,
      title: "Enhanced GitHub Analytics",
      description: "Comprehensive repository statistics, language distribution, and activity tracking",
      improvements: [
        "Repository activity charts",
        "Language usage analysis", 
        "Trending repositories",
        "Commit statistics",
        "Stars and forks tracking"
      ]
    },
    {
      icon: <Code className="text-orange-400" size={24} />,
      title: "Advanced LeetCode Dashboard", 
      description: "Professional problem-solving analytics and progress tracking",
      improvements: [
        "Problem difficulty breakdown",
        "Submission calendar heatmap",
        "Contest rating progress",
        "Topic-wise analysis",
        "Daily challenge integration"
      ]
    },
    {
      icon: <Trophy className="text-yellow-400" size={24} />,
      title: "Professional Contest Portal",
      description: "Beautiful contest management with filtering and timeline view",
      improvements: [
        "Platform-based filtering",
        "Contest countdown timers",
        "Visual contest cards",
        "Timeline visualization",
        "Statistics overview"
      ]
    },
    {
      icon: <BarChart3 className="text-green-400" size={24} />,
      title: "Interactive Data Visualization",
      description: "Custom charts and graphs for better data insights",
      improvements: [
        "Animated progress bars",
        "Circular progress indicators",
        "Heatmap visualizations",
        "Line chart progressions",
        "Custom styling themes"
      ]
    }
  ];

  const newEndpoints = [
    {
      endpoint: "/api/github/:username/stats",
      description: "Comprehensive repository statistics and language analysis"
    },
    {
      endpoint: "/api/github/:username/activity",
      description: "Commit activity tracking across repositories"
    },
    {
      endpoint: "/api/github/:username/trending",
      description: "Top performing repositories by stars and activity"
    },
    {
      endpoint: "/api/leetcode/:username/calendar",
      description: "Submission calendar and activity streak data"
    },
    {
      endpoint: "/api/leetcode/:username/contests",
      description: "Contest history and rating progression"
    },
    {
      endpoint: "/api/leetcode/:username/topics",
      description: "Problem-solving statistics by topic categories"
    },
    {
      endpoint: "/api/leetcode/daily/challenge",
      description: "Current daily coding challenge information"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <TrendingUp className="mr-4 text-blue-400" size={40} />
          DevDash Enhanced Features
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Your developer dashboard has been transformed into a professional analytics platform with advanced charts, 
          new endpoints, and comprehensive data visualization for GitHub, LeetCode, and contest tracking.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-white ml-3">{feature.title}</h3>
            </div>
            
            <p className="text-gray-400 mb-4">{feature.description}</p>
            
            <div className="space-y-2">
              {feature.improvements.map((improvement, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  {improvement}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="bg-gray-800/40 border border-gray-700 rounded-xl p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Activity className="mr-3 text-green-400" size={28} />
          New API Endpoints
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {newEndpoints.map((endpoint, index) => (
            <motion.div
              key={index}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-mono text-blue-400 text-sm mb-2">
                {endpoint.endpoint}
              </div>
              <div className="text-gray-300 text-sm">
                {endpoint.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <PieChart className="mx-auto mb-4 text-purple-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Custom Charts</h3>
          <p className="text-gray-400 text-sm">
            Built custom visualization components for better performance and user experience
          </p>
        </div>
        
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <Target className="mx-auto mb-4 text-green-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Professional UI</h3>
          <p className="text-gray-400 text-sm">
            Enhanced layouts with responsive design and smooth animations throughout
          </p>
        </div>
        
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-center">
          <Calendar className="mx-auto mb-4 text-blue-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Real-time Data</h3>
          <p className="text-gray-400 text-sm">
            Live data fetching with comprehensive error handling and loading states
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/30 rounded-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Star className="mx-auto mb-4 text-yellow-400" size={48} />
        <h2 className="text-2xl font-semibold text-white mb-4">Your Enhanced DevDash is Ready!</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Navigate to the GitHub and LeetCode pages to explore the new professional dashboard experience. 
          Your development journey tracking has never been more comprehensive and visually appealing.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center">
            <Github className="mr-2" size={20} />
            View GitHub Dashboard
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center">
            <Code className="mr-2" size={20} />
            View LeetCode Dashboard
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center">
            <Trophy className="mr-2" size={20} />
            View Contests
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;

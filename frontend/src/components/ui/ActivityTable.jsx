import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Filter, Calendar, User, GitCommit } from 'lucide-react'

const ActivityTable = ({ 
    activities = [], 
    title = "Activity Log",
    subtitle = "",
    className = "",
    showFilters = true,
    itemsPerPage = 10,
    showPagination = true
}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState('all')
    const [timeFilter, setTimeFilter] = useState('all')

    const getActivityIcon = (type) => {
        const icons = {
            commit: <GitCommit size={16} className="text-green-400" />,
            submission: <Activity size={16} className="text-blue-400" />,
            contest: <User size={16} className="text-purple-400" />,
            achievement: <Activity size={16} className="text-yellow-400" />,
            default: <Activity size={16} className="text-gray-400" />
        }
        return icons[type] || icons.default
    }

    const getActivityColor = (type) => {
        const colors = {
            commit: 'bg-green-500/10 border-green-500/20',
            submission: 'bg-blue-500/10 border-blue-500/20',
            contest: 'bg-purple-500/10 border-purple-500/20',
            achievement: 'bg-yellow-500/10 border-yellow-500/20',
            default: 'bg-gray-500/10 border-gray-500/20'
        }
        return colors[type] || colors.default
    }

    const formatTimeAgo = (timestamp) => {
        const now = new Date()
        const activityTime = new Date(timestamp)
        const diffInSeconds = Math.floor((now - activityTime) / 1000)
        
        if (diffInSeconds < 60) return 'Just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
        return activityTime.toLocaleDateString()
    }

    const filteredActivities = activities.filter(activity => {
        if (filter !== 'all' && activity.type !== filter) return false
        
        if (timeFilter !== 'all') {
            const now = new Date()
            const activityTime = new Date(activity.timestamp)
            const diffInDays = Math.floor((now - activityTime) / (1000 * 60 * 60 * 24))
            
            if (timeFilter === 'today' && diffInDays > 0) return false
            if (timeFilter === 'week' && diffInDays > 7) return false
            if (timeFilter === 'month' && diffInDays > 30) return false
        }
        
        return true
    })

    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage)

    const activityTypes = [...new Set(activities.map(a => a.type))]

    return (
        <div className={`border border-gray-700 rounded-xl bg-gray-800/40 backdrop-blur-sm overflow-hidden ${className}`}>
            <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Activity className="mr-3 text-blue-400" size={24} />
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-gray-400 mt-1">{subtitle}</p>
                        )}
                    </div>
                    
                    {showFilters && (
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-gray-400" />
                                <select 
                                    value={filter} 
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Types</option>
                                    {activityTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <select 
                                    value={timeFilter} 
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {paginatedActivities.length > 0 ? (
                    <div className="divide-y divide-gray-700/50">
                        <AnimatePresence>
                            {paginatedActivities.map((activity, index) => (
                                <motion.div
                                    key={activity.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="p-4 hover:bg-gray-700/30 transition-all duration-200"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center ${getActivityColor(activity.type)}`}>
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">
                                                        {activity.title}
                                                    </p>
                                                    {activity.description && (
                                                        <p className="text-gray-400 text-sm mt-1">
                                                            {activity.description}
                                                        </p>
                                                    )}
                                                    
                                                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                        <span className="flex items-center">
                                                            <Calendar size={12} className="mr-1" />
                                                            {formatTimeAgo(activity.timestamp)}
                                                        </span>
                                                        
                                                        {activity.user && (
                                                            <span className="flex items-center">
                                                                <User size={12} className="mr-1" />
                                                                {activity.user}
                                                            </span>
                                                        )}
                                                        
                                                        {activity.repository && (
                                                            <span className="flex items-center">
                                                                <GitCommit size={12} className="mr-1" />
                                                                {activity.repository}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {activity.status && (
                                                    <span className={`
                                                        px-2 py-1 rounded-full text-xs font-medium
                                                        ${activity.status === 'success' ? 'bg-green-500/20 text-green-300' :
                                                          activity.status === 'failure' ? 'bg-red-500/20 text-red-300' :
                                                          activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                                          'bg-gray-500/20 text-gray-300'}
                                                    `}>
                                                        {activity.status}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {activity.link && (
                                                <motion.a
                                                    href={activity.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    className="inline-flex items-center mt-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                                                >
                                                    View Details →
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Activity className="mx-auto mb-4 text-gray-600" size={48} />
                        <h3 className="text-lg font-medium text-white mb-2">No activities found</h3>
                        <p className="text-gray-400">
                            {filter === 'all' && timeFilter === 'all' 
                                ? "No activities to display" 
                                : "No activities match your current filters"
                            }
                        </p>
                    </div>
                )}
            </div>

            {showPagination && totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredActivities.length)} of {filteredActivities.length} activities
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                            >
                                Previous
                            </button>
                            
                            <span className="text-gray-400 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{activities.length}</div>
                        <div className="text-gray-400">Total Activities</div>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-lg font-bold text-green-400">
                            {activities.filter(a => a.status === 'success').length}
                        </div>
                        <div className="text-gray-400">Successful</div>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">
                            {activities.filter(a => {
                                const today = new Date().toDateString()
                                return new Date(a.timestamp).toDateString() === today
                            }).length}
                        </div>
                        <div className="text-gray-400">Today</div>
                    </div>
                    
                    <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">
                            {activityTypes.length}
                        </div>
                        <div className="text-gray-400">Types</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityTable

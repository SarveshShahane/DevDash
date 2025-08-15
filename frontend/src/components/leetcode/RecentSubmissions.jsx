import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLeetCodeStore } from '../../zustand/store'
import TypingText from '../TypingText'
import { ExternalLink, Calendar, Code, CheckCircle, XCircle, Clock, Filter } from 'lucide-react'

const RecentSubmissions = () => {
    const { leetCodeData } = useLeetCodeStore()
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('date')

    if (!leetCodeData?.submissionList) {
        return (
            <div className="border border-gray-700 rounded-xl bg-gray-800/40 p-6">
                <h2 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
                    <Code className="mr-2 text-green-400" size={20} />
                    Recent Submissions
                </h2>
                <div className="text-center py-8">
                    <TypingText text={'No submissions to display⛓️‍💥...\n Come back after solving one...'} />
                </div>
            </div>
        )
    }

    const { submissionList } = leetCodeData
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'text-green-400 bg-green-400/10 border-green-400/20'
            case 'Wrong Answer': return 'text-red-400 bg-red-400/10 border-red-400/20'
            case 'Time Limit Exceeded': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
            case 'Runtime Error': return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
            case 'Memory Limit Exceeded': return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
        }
    }
    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Accepted': return <CheckCircle size={16} />
            case 'Wrong Answer': return <XCircle size={16} />
            case 'Time Limit Exceeded': return <Clock size={16} />
            case 'Runtime Error': return <XCircle size={16} />
            default: return <XCircle size={16} />
        }
    }
    
    const getLanguageColor = (lang) => {
        const colors = {
            'python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            'javascript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
            'java': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
            'cpp': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
            'c': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
            'go': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            'rust': 'bg-orange-600/20 text-orange-300 border-orange-600/30',
            'kotlin': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            'swift': 'bg-orange-400/20 text-orange-300 border-orange-400/30',
            'typescript': 'bg-blue-400/20 text-blue-300 border-blue-400/30'
        }
        return colors[lang.toLowerCase()] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }

    const filteredSubmissions = submissionList.filter(submission => {
        if (filter === 'all') return true
        if (filter === 'accepted') return submission.statusDisplay === 'Accepted'
        if (filter === 'failed') return submission.statusDisplay !== 'Accepted'
        return true
    })

    const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
        if (sortBy === 'date') return b.timestamp - a.timestamp
        if (sortBy === 'title') return a.title.localeCompare(b.title)
        if (sortBy === 'status') return a.statusDisplay.localeCompare(b.statusDisplay)
        return 0
    })

    return (
        <div className="border border-gray-700 rounded-xl bg-gray-800/40 backdrop-blur-sm">
            <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-lg font-medium text-gray-100 flex items-center">
                        <Code className="mr-2 text-green-400" size={20} />
                        Recent Submissions
                        <span className="ml-2 text-sm text-gray-400">({submissionList.length})</span>
                    </h2>
                    
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <select 
                                value={filter} 
                                onChange={(e) => setFilter(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="accepted">Accepted</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                        
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="title">Sort by Title</option>
                            <option value="status">Sort by Status</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                {sortedSubmissions.length > 0 ? (
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-700 bg-gray-800/60">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Problem
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Language
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            <AnimatePresence>
                                {sortedSubmissions.map((submission, i) => {
                                    const date = new Date(submission.timestamp * 1000).toLocaleString('en-us', { 
                                        month: 'short', 
                                        day: 'numeric', 
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    
                                    return (
                                        <motion.tr 
                                            key={submission.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2, delay: i * 0.05 }}
                                            className="hover:bg-gray-700/30 transition-all duration-200 group"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 text-sm font-medium">
                                                    {i + 1}
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                                            {submission.title}
                                                        </div>
                                                        <div className="text-gray-400 text-sm">
                                                            {submission.titleSlug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(submission.statusDisplay)}`}>
                                                    {getStatusIcon(submission.statusDisplay)}
                                                    {submission.statusDisplay}
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getLanguageColor(submission.lang)}`}>
                                                    {submission.lang}
                                                </span>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-gray-300 text-sm">
                                                    <Calendar size={14} className="mr-2 text-gray-400" />
                                                    {date}
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <motion.a 
                                                    href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                >
                                                    <ExternalLink size={14} />
                                                    View
                                                </motion.a>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                                <Code size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">No submissions found</h3>
                            <p className="text-gray-400 max-w-sm">
                                {filter === 'all' 
                                    ? "No submissions to display. Come back after solving some problems!"
                                    : `No ${filter} submissions found. Try adjusting your filter.`
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            {sortedSubmissions.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                            <span>Total: {submissionList.length} submissions</span>
                            <span>•</span>
                            <span>Accepted: {submissionList.filter(s => s.statusDisplay === 'Accepted').length}</span>
                            <span>•</span>
                            <span>Success Rate: {((submissionList.filter(s => s.statusDisplay === 'Accepted').length / submissionList.length) * 100).toFixed(1)}%</span>
                        </div>
                        {filteredSubmissions.length !== submissionList.length && (
                            <span>Showing {filteredSubmissions.length} of {submissionList.length}</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecentSubmissions
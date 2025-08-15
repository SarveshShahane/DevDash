import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const LeaderboardTable = ({ 
    data = [], 
    title = "Leaderboard",
    subtitle = "",
    columns = [],
    className = "",
    showRanking = true,
    rankingColumn = "rank",
    pointsColumn = "points",
    nameColumn = "name",
    avatarColumn = "avatar",
    changeColumn = "change",
    onRowClick = null 
}) => {
    const [sortBy, setSortBy] = useState(rankingColumn)
    const [sortOrder, setSortOrder] = useState('asc')

    const getRankIcon = (rank) => {
        if (rank === 1) return <Trophy className="text-yellow-500" size={20} />
        if (rank === 2) return <Medal className="text-gray-400" size={20} />
        if (rank === 3) return <Award className="text-orange-400" size={20} />
        return <span className="text-gray-400 font-bold text-lg">#{rank}</span>
    }

    const getRankBadge = (rank) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
        if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-600 text-black'
        if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-black'
        return 'bg-gray-700 text-gray-300'
    }

    const getChangeIndicator = (change) => {
        if (!change) return <Minus className="text-gray-500" size={16} />
        if (change > 0) return (
            <div className="flex items-center text-green-400">
                <TrendingUp size={16} />
                <span className="ml-1 text-sm">+{change}</span>
            </div>
        )
        if (change < 0) return (
            <div className="flex items-center text-red-400">
                <TrendingDown size={16} />
                <span className="ml-1 text-sm">{change}</span>
            </div>
        )
        return <Minus className="text-gray-500" size={16} />
    }

    const sortedData = [...data].sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]
        
        if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1
        }
        return aVal < bVal ? 1 : -1
    })

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
    }

    return (
        <div className={`border border-gray-700 rounded-xl bg-gray-800/40 backdrop-blur-sm overflow-hidden ${className}`}>
            <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Trophy className="mr-3 text-yellow-500" size={24} />
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-gray-400 mt-1">{subtitle}</p>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">{data.length}</div>
                        <div className="text-sm text-gray-400">Participants</div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                {data.length > 0 ? (
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-700 bg-gray-800/60">
                                {showRanking && (
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-20">
                                        Rank
                                    </th>
                                )}
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    <button 
                                        onClick={() => handleSort(nameColumn)}
                                        className="flex items-center hover:text-white transition-colors"
                                    >
                                        Player
                                        {sortBy === nameColumn && (
                                            <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    <button 
                                        onClick={() => handleSort(pointsColumn)}
                                        className="flex items-center hover:text-white transition-colors"
                                    >
                                        Score
                                        {sortBy === pointsColumn && (
                                            <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </button>
                                </th>
                                {changeColumn && (
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                        Change
                                    </th>
                                )}
                                {columns.map((column, index) => (
                                    <th 
                                        key={index}
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                                    >
                                        <button 
                                            onClick={() => handleSort(column.key)}
                                            className="flex items-center hover:text-white transition-colors"
                                        >
                                            {column.header}
                                            {sortBy === column.key && (
                                                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            <AnimatePresence>
                                {sortedData.map((row, index) => {
                                    const rank = row[rankingColumn] || index + 1
                                    const isTop3 = rank <= 3
                                    
                                    return (
                                        <motion.tr 
                                            key={row.id || index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className={`
                                                hover:bg-gray-700/30 transition-all duration-200 group
                                                ${isTop3 ? 'bg-gradient-to-r from-gray-700/20 to-transparent' : ''}
                                                ${onRowClick ? 'cursor-pointer' : ''}
                                            `}
                                            onClick={() => onRowClick && onRowClick(row)}
                                        >
                                            {showRanking && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center justify-center">
                                                        {rank <= 3 ? (
                                                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankBadge(rank)}`}>
                                                                {getRankIcon(rank)}
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 font-bold">
                                                                {rank}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                            
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {row[avatarColumn] && (
                                                        <div className="flex-shrink-0 h-10 w-10 mr-4">
                                                            <img 
                                                                className="h-10 w-10 rounded-full border-2 border-gray-600"
                                                                src={row[avatarColumn]} 
                                                                alt={row[nameColumn]}
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none'
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className={`text-sm font-medium ${isTop3 ? 'text-yellow-300' : 'text-white'} group-hover:text-blue-400 transition-colors`}>
                                                            {row[nameColumn]}
                                                        </div>
                                                        {row.username && row.username !== row[nameColumn] && (
                                                            <div className="text-sm text-gray-400">
                                                                @{row.username}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`text-lg font-bold ${isTop3 ? 'text-yellow-400' : 'text-white'}`}>
                                                    {typeof row[pointsColumn] === 'number' 
                                                        ? row[pointsColumn].toLocaleString() 
                                                        : row[pointsColumn]
                                                    }
                                                </div>
                                                {row.subtitle && (
                                                    <div className="text-sm text-gray-400">{row.subtitle}</div>
                                                )}
                                            </td>
                                            
                                            {changeColumn && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getChangeIndicator(row[changeColumn])}
                                                </td>
                                            )}
                                            
                                            {columns.map((column, colIndex) => (
                                                <td 
                                                    key={colIndex}
                                                    className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                                                >
                                                    {column.render 
                                                        ? column.render(row[column.key], row, index)
                                                        : <span className="text-gray-300">{row[column.key]}</span>
                                                    }
                                                </td>
                                            ))}
                                        </motion.tr>
                                    )
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <Trophy className="mx-auto mb-4 text-gray-600" size={48} />
                        <h3 className="text-lg font-medium text-white mb-2">No data available</h3>
                        <p className="text-gray-400">The leaderboard is empty</p>
                    </div>
                )}
            </div>

            {data.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                            <span>Total Participants: {data.length}</span>
                            {data.length > 0 && (
                                <>
                                    <span>•</span>
                                    <span>
                                        Avg Score: {(data.reduce((sum, item) => sum + (item[pointsColumn] || 0), 0) / data.length).toFixed(1)}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="text-xs text-gray-500">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LeaderboardTable

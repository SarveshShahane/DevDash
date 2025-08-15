import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react'

const StatsTable = ({ 
    data = [], 
    title = "Statistics",
    subtitle = "",
    className = "",
    showTrends = true,
    showPercentages = true,
    colorScheme = 'blue'
}) => {
    const colorSchemes = {
        blue: {
            primary: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            gradient: 'from-blue-500 to-blue-600'
        },
        green: {
            primary: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            gradient: 'from-green-500 to-green-600'
        },
        purple: {
            primary: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            gradient: 'from-purple-500 to-purple-600'
        },
        orange: {
            primary: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            gradient: 'from-orange-500 to-orange-600'
        }
    }

    const colors = colorSchemes[colorScheme] || colorSchemes.blue

    const getTrendIndicator = (trend) => {
        if (!trend || trend === 0) return <Minus className="text-gray-500" size={16} />
        if (trend > 0) return (
            <div className="flex items-center text-green-400">
                <TrendingUp size={16} />
                <span className="ml-1 text-sm font-medium">+{trend}%</span>
            </div>
        )
        return (
            <div className="flex items-center text-red-400">
                <TrendingDown size={16} />
                <span className="ml-1 text-sm font-medium">{trend}%</span>
            </div>
        )
    }

    const formatValue = (value, type = 'number') => {
        if (typeof value === 'number') {
            if (type === 'percentage') return `${value.toFixed(1)}%`
            if (type === 'currency') return `$${value.toLocaleString()}`
            if (type === 'time') {
                const hours = Math.floor(value / 60)
                const minutes = value % 60
                return `${hours}h ${minutes}m`
            }
            return value.toLocaleString()
        }
        return value
    }

    const getProgressBar = (current, total, color = colors.gradient) => {
        const percentage = Math.min((current / total) * 100, 100)
        return (
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                />
            </div>
        )
    }

    return (
        <div className={`border border-gray-700 rounded-xl bg-gray-800/40 backdrop-blur-sm overflow-hidden ${className}`}>
            <div className={`p-6 border-b border-gray-700 ${colors.bg}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <BarChart3 className={`mr-3 ${colors.primary}`} size={24} />
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-gray-400 mt-1">{subtitle}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                {data.length > 0 ? (
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-700 bg-gray-800/60">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Metric
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Value
                                </th>
                                {showTrends && (
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                        Trend
                                    </th>
                                )}
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Progress
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {data.map((item, index) => (
                                <motion.tr 
                                    key={item.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="hover:bg-gray-700/30 transition-all duration-200"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {item.icon && (
                                                <div className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center mr-3`}>
                                                    {item.icon}
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-white font-medium">
                                                    {item.label}
                                                </div>
                                                {item.description && (
                                                    <div className="text-sm text-gray-400">
                                                        {item.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <div className={`text-lg font-bold ${colors.primary}`}>
                                            {formatValue(item.value, item.type)}
                                        </div>
                                        {item.subtitle && (
                                            <div className="text-sm text-gray-400">
                                                {item.subtitle}
                                            </div>
                                        )}
                                    </td>
                                    
                                    {showTrends && (
                                        <td className="px-6 py-4">
                                            {getTrendIndicator(item.trend)}
                                        </td>
                                    )}
                                    
                                    <td className="px-6 py-4">
                                        {item.target ? (
                                            <div className="space-y-2">
                                                {getProgressBar(item.value, item.target)}
                                                <div className="flex justify-between text-sm text-gray-400">
                                                    <span>{formatValue(item.value, item.type)}</span>
                                                    <span>{formatValue(item.target, item.type)}</span>
                                                </div>
                                            </div>
                                        ) : item.percentage !== undefined ? (
                                            <div className="space-y-2">
                                                {getProgressBar(item.percentage, 100)}
                                                <div className="text-right text-sm text-gray-400">
                                                    {item.percentage.toFixed(1)}%
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 text-sm">
                                                No target set
                                            </div>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <BarChart3 className="mx-auto mb-4 text-gray-600" size={48} />
                        <h3 className="text-lg font-medium text-white mb-2">No statistics available</h3>
                        <p className="text-gray-400">No data to display</p>
                    </div>
                )}
            </div>

            {data.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                            <div className={`text-lg font-bold ${colors.primary}`}>
                                {data.length}
                            </div>
                            <div className="text-gray-400">Total Metrics</div>
                        </div>
                        
                        {showTrends && (
                            <div className="text-center">
                                <div className={`text-lg font-bold ${colors.primary}`}>
                                    {data.filter(item => (item.trend || 0) > 0).length}
                                </div>
                                <div className="text-gray-400">Improving</div>
                            </div>
                        )}
                        
                        <div className="text-center">
                            <div className={`text-lg font-bold ${colors.primary}`}>
                                {data.filter(item => item.target && item.value >= item.target).length}
                            </div>
                            <div className="text-gray-400">Targets Met</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatsTable

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TodoRender = ({ todos, remove, mark, save, playerStats }) => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('priority');
    const [completionEffect, setCompletionEffect] = useState(null);
    
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    const categoryIcons = {
        general: '📋',
        work: '💼', 
        personal: '👤',
        health: '💪',
        learning: '📚',
        social: '👥'
    };
    
    const getPriorityColor = (priority) => {
        const colors = {
            low: 'from-green-500 to-green-600',
            medium: 'from-blue-500 to-blue-600',
            high: 'from-orange-500 to-orange-600', 
            urgent: 'from-red-500 to-red-600'
        };
        return colors[priority] || colors.medium;
    };
    
    const getPriorityBorder = (priority) => {
        const colors = {
            low: 'border-green-500',
            medium: 'border-blue-500',
            high: 'border-orange-500',
            urgent: 'border-red-500'
        };
        return colors[priority] || colors.medium;
    };
    
    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.isCompleted;
        if (filter === 'active') return !todo.isCompleted;
        return todo.category === filter;
    });
    
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortBy === 'priority') {
            if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1;
            }
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortBy === 'time') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === 'xp') {
            return b.xpReward - a.xpReward;
        }
        return 0;
    });
    
    const handleComplete = (todo) => {
        if (!todo.isCompleted) {
            const todoId = todo.id || todo.title + '_' + Date.now();
            setCompletionEffect(todoId);
            setTimeout(() => setCompletionEffect(null), 2000);
        }
        mark(todo.id || sortedTodos.indexOf(todo)); 
        save();
    };
    
    const getTimeEstimateColor = (minutes) => {
        if (minutes <= 15) return 'text-green-400';
        if (minutes <= 60) return 'text-yellow-400';
        return 'text-red-400';
    };
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2 sm:p-4 space-y-4"
        >
            <div className="flex flex-col gap-4 mb-6 p-4 bg-gray-800 rounded-xl">
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold">Filter:</h3>
                    <div className="flex flex-wrap gap-2">
                        {['all', 'active', 'completed', 'work', 'personal', 'health', 'learning', 'social'].map(filterType => (
                            <motion.button
                                key={filterType}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilter(filterType)}
                                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                    filter === filterType 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            </motion.button>
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold">Sort:</h3>
                    <div className="flex flex-wrap gap-2">
                        {['priority', 'time', 'xp'].map(sortType => (
                            <motion.button
                                key={sortType}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSortBy(sortType)}
                                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                    sortBy === sortType 
                                        ? 'bg-purple-500 text-white' 
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
            
            <AnimatePresence>
                {sortedTodos.length > 0 ? (
                    sortedTodos.map((todo, idx) => (
                        <motion.div 
                            key={todo.id}
                            layout
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                rotateX: completionEffect === todo.id ? [0, 360, 0] : 0
                            }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            transition={{ 
                                duration: 0.3, 
                                delay: idx * 0.05,
                                rotateX: { duration: 1.5 }
                            }}
                            className={`relative p-4 sm:p-6 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 ${
                                todo.isCompleted 
                                    ? 'bg-gray-800/50 border-gray-600' 
                                    : `bg-gray-800/80 ${getPriorityBorder(todo.priority || 'medium')} shadow-lg hover:shadow-xl`
                            }`}
                        >
                            {completionEffect === todo.id && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl pointer-events-none"
                                >
                                    <span className="text-4xl sm:text-6xl">🎉</span>
                                </motion.div>
                            )}
                            
                            <div className="flex flex-col space-y-4">
                                <div className="flex-grow">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <span className="text-xl sm:text-2xl">{categoryIcons[todo.category || 'general'] || '📋'}</span>
                                            <h3 className={`text-base sm:text-lg font-semibold ${
                                                todo.isCompleted 
                                                    ? 'line-through text-gray-500' 
                                                    : 'text-white'
                                            }`}>
                                                {todo.title}
                                            </h3>
                                        </div>
                                        
                                        {!todo.isCompleted && (
                                            <motion.div 
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPriorityColor(todo.priority || 'medium')} self-start sm:self-center`}
                                            >
                                                +{todo.xpReward || 25} XP
                                            </motion.div>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            ⚡ {(todo.priority || 'medium').toUpperCase()}
                                        </span>
                                        <span className={`flex items-center gap-1 ${getTimeEstimateColor(todo.estimatedTime || 30)}`}>
                                            ⏱️ {todo.estimatedTime || 30}m
                                        </span>
                                        {todo.completedAt && (
                                            <span className="flex items-center gap-1 text-green-400">
                                                ✅ {new Date(todo.completedAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex-1 sm:flex-none ${
                                            todo.isCompleted 
                                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
                                        }`}
                                        onClick={() => handleComplete(todo)}
                                        disabled={todo.isCompleted}
                                    >
                                        {todo.isCompleted ? '✓ Completed' : '🎯 Complete Quest'}
                                    </motion.button>
                                    
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className='bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:from-red-600 hover:to-red-700 shadow-lg transition-all flex-1 sm:flex-none'
                                        onClick={() => { remove(todo.id || sortedTodos.indexOf(todo)); save(); }}
                                    >
                                        🗑️ Delete
                                    </motion.button>
                                </div>
                            </div>
                            
                            {!todo.isCompleted && (
                                <div className="mt-4">
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: '30%' }}
                                            transition={{ duration: 2, delay: idx * 0.1 }}
                                            className={`h-2 rounded-full bg-gradient-to-r ${getPriorityColor(todo.priority || 'medium')}`}
                                        ></motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-12 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-600"
                    >
                        <div className="text-6xl mb-4">🏆</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Quests Found!</h3>
                        <p className="text-gray-400">
                            {filter === 'completed' 
                                ? "No completed quests yet. Start your journey!" 
                                : "Ready to embark on your next adventure? Create a new quest above!"}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {todos.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl"
                >
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                        📊 Quest Statistics
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-blue-400">{todos.length}</div>
                            <div className="text-xs sm:text-sm text-gray-400">Total Quests</div>
                        </div>
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-green-400">
                                {todos.filter(t => t.isCompleted).length}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400">Completed</div>
                        </div>
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-orange-400">
                                {todos.filter(t => !t.isCompleted).length}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400">Active</div>
                        </div>
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-purple-400">
                                {todos.reduce((total, todo) => total + (todo.isCompleted ? (todo.xpReward || 25) : 0), 0)}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400">XP Earned</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default TodoRender
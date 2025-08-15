import React, { useEffect, useState } from 'react'
import { todoStore } from '../zustand/store'
import { motion, AnimatePresence } from 'framer-motion'

const ProgressBar = () => {
    const { todos, playerStats } = todoStore();
    const [showCelebration, setShowCelebration] = useState(false);
    const [lastPercent, setLastPercent] = useState(0);
    
    const completedTodos = todos.filter(todo => todo.isCompleted).length;
    const total = todos.length;
    let percent = total === 0 ? 0 : (completedTodos / total) * 100;
    
    useEffect(() => {
        if (percent === 100 && lastPercent < 100 && total > 0) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        }
        setLastPercent(percent);
    }, [percent, lastPercent, total]);
    
    const getProgressColor = () => {
        if (percent === 100) return 'from-yellow-400 via-orange-500 to-red-500';
        if (percent >= 75) return 'from-green-400 via-green-500 to-emerald-600';
        if (percent >= 50) return 'from-blue-400 via-blue-500 to-cyan-600';
        if (percent >= 25) return 'from-purple-400 via-purple-500 to-indigo-600';
        return 'from-gray-400 via-gray-500 to-gray-600';
    };
    
    const getProgressEmoji = () => {
        if (percent === 100) return '🎉';
        if (percent >= 75) return '🔥';
        if (percent >= 50) return '⚡';
        if (percent >= 25) return '💪';
        return '🚀';
    };
    
    const totalPossibleXP = todos.reduce((sum, todo) => sum + (todo.xpReward || 0), 0);
    const earnedXP = todos.filter(todo => todo.isCompleted).reduce((sum, todo) => sum + (todo.xpReward || 0), 0);
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl mb-4 relative overflow-hidden'
        >
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm z-10"
                    >
                        <div className="text-center">
                            <div className="text-6xl mb-2">🎊</div>
                            <h3 className="text-2xl font-bold text-white">ALL QUESTS COMPLETED!</h3>
                            <p className="text-yellow-400">You're a true quest master! 🏆</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {getProgressEmoji()} Quest Progress
                </h3>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white">{Math.round(percent)}%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                </div>
            </div>
            
            <div className='relative w-full rounded-full h-6 bg-gray-700 overflow-hidden border-2 border-gray-600 mb-4'>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`bg-gradient-to-r ${getProgressColor()} h-full relative overflow-hidden`}
                >
                    <motion.div
                        animate={{ x: [-100, 200] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                        style={{ width: '100px' }}
                    />
                </motion.div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white drop-shadow-lg">
                        {completedTodos} / {total}
                    </span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{completedTodos}</div>
                    <div className="text-xs text-gray-400">Completed Quests</div>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-400">{total - completedTodos}</div>
                    <div className="text-xs text-gray-400">Remaining Quests</div>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{earnedXP} / {totalPossibleXP}</div>
                    <div className="text-xs text-gray-400">XP Available</div>
                </div>
            </div>
            
            <motion.div 
                key={Math.floor(percent / 25)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
            >
                <p className="text-gray-300 text-sm">
                    {percent === 100 && total > 0 && "🎊 Incredible! You've completed all your quests!"}
                    {percent >= 75 && percent < 100 && "🔥 Almost there! You're crushing it!"}
                    {percent >= 50 && percent < 75 && "⚡ Great progress! Keep the momentum going!"}
                    {percent >= 25 && percent < 50 && "💪 Nice work! You're building momentum!"}
                    {percent < 25 && total > 0 && "🚀 Let's start this adventure!"}
                    {total === 0 && "✨ Ready to begin your quest? Create your first task above!"}
                </p>
            </motion.div>
            
            {playerStats.streak > 0 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 flex items-center justify-center gap-2 p-2 bg-orange-500/20 rounded-lg border border-orange-500/30"
                >
                    <span className="text-orange-400 font-bold">🔥 {playerStats.streak} Day Streak!</span>
                    <span className="text-sm text-gray-300">Keep it going!</span>
                </motion.div>
            )}
        </motion.div>
    )
}

export default ProgressBar
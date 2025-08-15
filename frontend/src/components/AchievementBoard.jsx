import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { todoStore } from '../zustand/store'

const AchievementBoard = ({ isOpen, onClose }) => {
    const { playerStats } = todoStore();
    const [isInternalOpen, setIsInternalOpen] = useState(false);
    
    // Use external control if props are provided, otherwise use internal state
    const isModalOpen = isOpen !== undefined ? isOpen : isInternalOpen;
    const handleClose = onClose || (() => setIsInternalOpen(false));
    const handleOpen = () => {
        if (isOpen === undefined) {
            setIsInternalOpen(true);
        }
    };
    
    const allAchievements = [
        { id: 'first_complete', name: 'First Victory!', description: 'Complete your first quest', icon: '🎯', unlocked: false },
        { id: 'level_5', name: 'Apprentice', description: 'Reach level 5', icon: '⭐', unlocked: false },
        { id: 'level_10', name: 'Expert', description: 'Reach level 10', icon: '🏆', unlocked: false },
        { id: 'level_20', name: 'Master', description: 'Reach level 20', icon: '👑', unlocked: false },
        { id: 'streak_7', name: 'Week Warrior', description: 'Complete quests for 7 days straight', icon: '🔥', unlocked: false },
        { id: 'streak_30', name: 'Monthly Master', description: 'Complete quests for 30 days straight', icon: '👑', unlocked: false },
        { id: 'complete_50', name: 'Half Century', description: 'Complete 50 quests', icon: '💯', unlocked: false },
        { id: 'complete_100', name: 'Centurion', description: 'Complete 100 quests', icon: '🚀', unlocked: false },
        { id: 'complete_500', name: 'Legend', description: 'Complete 500 quests', icon: '⚡', unlocked: false },
        { id: 'xp_1000', name: 'XP Collector', description: 'Earn 1000 total XP', icon: '💎', unlocked: false },
        { id: 'xp_5000', name: 'XP Master', description: 'Earn 5000 total XP', icon: '💠', unlocked: false },
        { id: 'all_priorities', name: 'Priority Expert', description: 'Complete quests of all priority levels', icon: '🎨', unlocked: false },
        { id: 'speed_demon', name: 'Speed Demon', description: 'Complete 10 quests in one day', icon: '⚡', unlocked: false },
        { id: 'perfectionist', name: 'Perfectionist', description: 'Complete 100% of daily quests for a week', icon: '✨', unlocked: false },
    ];
    
    const achievementsWithStatus = allAchievements.map(achievement => {
        const unlockedAchievement = playerStats.achievements.find(a => a.id === achievement.id);
        return {
            ...achievement,
            unlocked: !!unlockedAchievement,
            unlockedAt: unlockedAchievement?.unlockedAt
        };
    });
    
    const unlockedCount = achievementsWithStatus.filter(a => a.unlocked).length;
    const totalCount = achievementsWithStatus.length;
    const completionPercentage = (unlockedCount / totalCount) * 100;
    
    return (
        <>
            {/* Only show button if not controlled externally */}
            {isOpen === undefined && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-full shadow-2xl z-30 flex items-center gap-2"
                >
                    <span className="text-2xl">🏆</span>
                    <span className="font-bold">{unlockedCount}</span>
                </motion.button>
            )}
            
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                        🏆 Achievement Gallery
                                    </h2>
                                    <p className="text-gray-400 mt-1">
                                        {unlockedCount} of {totalCount} achievements unlocked ({Math.round(completionPercentage)}%)
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    ✕
                                </motion.button>
                            </div>
                            
                            <div className="mb-6">
                                <div className="w-full bg-gray-700 rounded-full h-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${completionPercentage}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {achievementsWithStatus.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            achievement.unlocked
                                                ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500 shadow-lg shadow-purple-500/20'
                                                : 'bg-gray-700/50 border-gray-600 opacity-60'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                                                {achievement.unlocked ? achievement.icon : '🔒'}
                                            </div>
                                            <h3 className={`font-bold text-lg mb-1 ${
                                                achievement.unlocked ? 'text-white' : 'text-gray-400'
                                            }`}>
                                                {achievement.name}
                                            </h3>
                                            <p className={`text-sm ${
                                                achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                                            }`}>
                                                {achievement.description}
                                            </p>
                                            {achievement.unlocked && achievement.unlockedAt && (
                                                <p className="text-xs text-purple-400 mt-2">
                                                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-8 p-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    📊 Your Journey
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-purple-400">Level {playerStats.level}</div>
                                        <div className="text-sm text-gray-400">Current Level</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-400">{playerStats.totalCompleted}</div>
                                        <div className="text-sm text-gray-400">Quests Completed</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-400">{playerStats.longestStreak}</div>
                                        <div className="text-sm text-gray-400">Best Streak</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-400">{playerStats.totalXpEarned}</div>
                                        <div className="text-sm text-gray-400">Total XP</div>
                                    </div>
                                </div>
                            </div>
                            
                            {unlockedCount < totalCount && (
                                <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-xl">
                                    <h4 className="text-blue-400 font-bold mb-2">🎯 Next Achievement:</h4>
                                    {(() => {
                                        const nextAchievement = achievementsWithStatus.find(a => !a.unlocked);
                                        return nextAchievement ? (
                                            <p className="text-gray-300">
                                                <span className="font-semibold">{nextAchievement.name}</span> - {nextAchievement.description}
                                            </p>
                                        ) : null;
                                    })()}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default AchievementBoard

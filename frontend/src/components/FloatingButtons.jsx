import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { todoStore } from '../zustand/store'
import QuestLog from './QuestLog'
import AchievementBoard from './AchievementBoard'
import Leaderboard from './Leaderboard'

const FloatingButtons = () => {
    const { playerStats } = todoStore()
    const [showQuestLog, setShowQuestLog] = useState(false)
    const [showAchievements, setShowAchievements] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    // Get achievements count for the button
    const unlockedCount = playerStats.achievements.length

    // Get user rank (simplified for button display)
    const getUserRank = () => {
        // This is a simplified version - in real app you'd calculate this properly
        return Math.max(1, 5 - Math.floor(playerStats.level / 3))
    }

    return (
        <>
            {/* Floating Button Container */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-3 bg-gray-800/90 backdrop-blur-md rounded-full p-2 shadow-2xl border border-gray-700"
                >
                    {/* Quest Log Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowQuestLog(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <span className="text-xl">📋</span>
                        <span className="hidden sm:block text-sm font-medium">Daily Quests</span>
                    </motion.button>

                    {/* Achievements Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowAchievements(true)}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <span className="text-xl">🏆</span>
                        <span className="bg-purple-700 text-xs px-2 py-0.5 rounded-full font-bold">
                            {unlockedCount}
                        </span>
                        <span className="hidden sm:block text-sm font-medium">Achievements</span>
                    </motion.button>

                    {/* Leaderboard Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowLeaderboard(true)}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <span className="text-xl">👑</span>
                        <span className="bg-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">
                            #{getUserRank()}
                        </span>
                        <span className="hidden sm:block text-sm font-medium">Leaderboard</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Quest Log Modal */}
            {showQuestLog && (
                <QuestLog 
                    isOpen={showQuestLog}
                    onClose={() => setShowQuestLog(false)}
                />
            )}

            {/* Achievements Modal */}
            {showAchievements && (
                <AchievementBoard 
                    isOpen={showAchievements}
                    onClose={() => setShowAchievements(false)}
                />
            )}

            {/* Leaderboard Modal */}
            {showLeaderboard && (
                <Leaderboard 
                    isOpen={showLeaderboard}
                    onClose={() => setShowLeaderboard(false)}
                />
            )}
        </>
    )
}

export default FloatingButtons

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { todoStore } from '../zustand/store'

const Leaderboard = ({ isOpen, onClose }) => {
    const { playerStats } = todoStore();
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    
    // Use external control if props are provided, otherwise use internal state
    const isModalOpen = isOpen !== undefined ? isOpen : showLeaderboard;
    const handleClose = onClose || (() => setShowLeaderboard(false));
    const handleOpen = () => {
        if (isOpen === undefined) {
            setShowLeaderboard(true);
        }
    };
    
    useEffect(() => {
        const mockUsers = [
            { 
                name: "You", 
                level: playerStats.level, 
                xp: playerStats.totalXpEarned, 
                completed: playerStats.totalCompleted,
                streak: playerStats.streak,
                achievements: playerStats.achievements.length,
                isCurrentUser: true 
            },
            { 
                name: "CodeMaster", 
                level: Math.max(1, playerStats.level - 2), 
                xp: Math.max(0, playerStats.totalXpEarned - 500), 
                completed: Math.max(0, playerStats.totalCompleted - 15),
                streak: Math.max(0, playerStats.streak - 3),
                achievements: Math.max(0, playerStats.achievements.length - 2),
                isCurrentUser: false 
            },
            { 
                name: "QuestHero", 
                level: Math.max(1, playerStats.level - 1), 
                xp: Math.max(0, playerStats.totalXpEarned - 200), 
                completed: Math.max(0, playerStats.totalCompleted - 8),
                streak: Math.max(0, playerStats.streak - 1),
                achievements: Math.max(0, playerStats.achievements.length - 1),
                isCurrentUser: false 
            },
            { 
                name: "TaskNinja", 
                level: Math.max(1, playerStats.level + 1), 
                xp: playerStats.totalXpEarned + 300, 
                completed: playerStats.totalCompleted + 12,
                streak: playerStats.streak + 5,
                achievements: playerStats.achievements.length + 3,
                isCurrentUser: false 
            },
            { 
                name: "ProductivePro", 
                level: Math.max(1, playerStats.level - 3), 
                xp: Math.max(0, playerStats.totalXpEarned - 800), 
                completed: Math.max(0, playerStats.totalCompleted - 20),
                streak: Math.max(0, playerStats.streak - 5),
                achievements: Math.max(0, playerStats.achievements.length - 3),
                isCurrentUser: false 
            },
        ];
        
        const sorted = mockUsers.sort((a, b) => {
            if (b.level !== a.level) return b.level - a.level;
            return b.xp - a.xp;
        });
        
        setLeaderboardData(sorted);
    }, [playerStats]);
    
    const getUserRank = () => {
        return leaderboardData.findIndex(user => user.isCurrentUser) + 1;
    };
    
    const getRankSuffix = (rank) => {
        if (rank % 10 === 1 && rank % 100 !== 11) return 'st';
        if (rank % 10 === 2 && rank % 100 !== 12) return 'nd';
        if (rank % 10 === 3 && rank % 100 !== 13) return 'rd';
        return 'th';
    };
    
    const getRankColor = (rank) => {
        if (rank === 1) return 'text-yellow-400';
        if (rank === 2) return 'text-gray-300';
        if (rank === 3) return 'text-orange-400';
        return 'text-blue-400';
    };
    
    const getRankEmoji = (rank) => {
        if (rank === 1) return '👑';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return '🔹';
    };
    
    return (
        <>
            {/* Only show button if not controlled externally */}
            {isOpen === undefined && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    className="fixed top-20 sm:top-6 right-4 sm:right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 sm:p-4 rounded-full shadow-2xl z-30 flex items-center gap-2"
                >
                    <span className="text-xl sm:text-2xl">🏆</span>
                    <div className="text-center">
                        <div className="text-xs font-bold">#{getUserRank()}</div>
                    </div>
                </motion.button>
            )}
            
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={handleClose}
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
                                        🏆 Global Leaderboard
                                    </h2>
                                    <p className="text-gray-400 mt-1">
                                        See how you rank against other quest masters!
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
                            
                            <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl border border-purple-500/30">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">Your Current Rank</h3>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="text-4xl">{getRankEmoji(getUserRank())}</span>
                                        <div>
                                            <div className={`text-3xl font-bold ${getRankColor(getUserRank())}`}>
                                                #{getUserRank()}{getRankSuffix(getUserRank())}
                                            </div>
                                            <div className="text-gray-300">out of {leaderboardData.length} players</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {leaderboardData.map((user, index) => {
                                    const rank = index + 1;
                                    return (
                                        <motion.div
                                            key={user.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`p-4 rounded-xl border-2 ${
                                                user.isCurrentUser
                                                    ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500 shadow-lg shadow-purple-500/20'
                                                    : 'bg-gray-700/50 border-gray-600'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center min-w-[60px]">
                                                        <div className="text-2xl">{getRankEmoji(rank)}</div>
                                                        <div className={`font-bold ${getRankColor(rank)}`}>
                                                            #{rank}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-grow">
                                                        <h4 className={`text-lg font-bold ${
                                                            user.isCurrentUser ? 'text-purple-300' : 'text-white'
                                                        }`}>
                                                            {user.name} {user.isCurrentUser && '(You)'}
                                                        </h4>
                                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                                            <span>Level {user.level}</span>
                                                            <span>•</span>
                                                            <span>{user.completed} quests</span>
                                                            <span>•</span>
                                                            <span>{user.streak} day streak</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-yellow-400">
                                                        {user.xp.toLocaleString()} XP
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {user.achievements} achievements
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3">
                                                <div className="w-full bg-gray-600 rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(user.level / 20) * 100}%` }}
                                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-8 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl border border-yellow-500/30">
                                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                                    ⚡ How to Climb the Ranks
                                </h4>
                                <ul className="text-gray-300 text-sm space-y-1">
                                    <li>• Complete more quests to gain XP</li>
                                    <li>• Maintain daily streaks for bonus points</li>
                                    <li>• Unlock achievements for rank boosts</li>
                                    <li>• Focus on high-priority quests for more XP</li>
                                    <li>• Level up to improve your overall ranking</li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Leaderboard

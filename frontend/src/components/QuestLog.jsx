import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { todoStore } from '../zustand/store'

const QuestLog = ({ isOpen, onClose }) => {
    const { todos, addTodo, saveToLocal, playerStats } = todoStore();
    const [dailyChallenges, setDailyChallenges] = useState([]);
    const [showInternalQuestLog, setShowInternalQuestLog] = useState(false);
    
    // Use external control if props are provided, otherwise use internal state
    const isModalOpen = isOpen !== undefined ? isOpen : showInternalQuestLog;
    const handleClose = onClose || (() => setShowInternalQuestLog(false));
    const handleOpen = () => {
        if (isOpen === undefined) {
            setShowInternalQuestLog(true);
        }
    };
    
    const challengeTemplates = [
        { title: "Complete 3 high priority quests", priority: "high", target: 3, type: "priority", xp: 150 },
        { title: "Finish 5 quests in total", priority: "medium", target: 5, type: "count", xp: 100 },
        { title: "Complete a quest in under 15 minutes", priority: "urgent", target: 1, type: "speed", xp: 200 },
        { title: "Complete all quests for today", priority: "urgent", target: "all", type: "perfect", xp: 300 },
        { title: "Complete 2 learning quests", priority: "medium", target: 2, type: "category", category: "learning", xp: 120 },
        { title: "Complete 2 work quests", priority: "medium", target: 2, type: "category", category: "work", xp: 120 },
        { title: "Complete 1 urgent quest", priority: "urgent", target: 1, type: "priority_specific", priorityTarget: "urgent", xp: 250 },
    ];
    
    useEffect(() => {
        const today = new Date().toDateString();
        const storedChallenges = localStorage.getItem(`dailyChallenges_${today}`);
        
        if (!storedChallenges) {
            const shuffled = [...challengeTemplates].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3).map((challenge, index) => ({
                ...challenge,
                id: `daily_${today}_${index}`,
                progress: 0,
                completed: false,
                date: today
            }));
            
            setDailyChallenges(selected);
            localStorage.setItem(`dailyChallenges_${today}`, JSON.stringify(selected));
        } else {
            setDailyChallenges(JSON.parse(storedChallenges));
        }
    }, []);
    
    useEffect(() => {
        const today = new Date().toDateString();
        const todaysCompletedTodos = todos.filter(todo => 
            todo.isCompleted && 
            todo.completedAt && 
            new Date(todo.completedAt).toDateString() === today
        );
        
        const updatedChallenges = dailyChallenges.map(challenge => {
            let progress = 0;
            
            switch (challenge.type) {
                case 'priority':
                    progress = todaysCompletedTodos.filter(todo => todo.priority === challenge.priority).length;
                    break;
                case 'priority_specific':
                    progress = todaysCompletedTodos.filter(todo => todo.priority === challenge.priorityTarget).length;
                    break;
                case 'count':
                    progress = todaysCompletedTodos.length;
                    break;
                case 'category':
                    progress = todaysCompletedTodos.filter(todo => todo.category === challenge.category).length;
                    break;
                case 'perfect':
                    const totalTodos = todos.filter(todo => !todo.isCompleted).length;
                    progress = totalTodos === 0 ? 1 : 0;
                    break;
                case 'speed':
                    progress = todaysCompletedTodos.length > 0 ? 1 : 0;
                    break;
                default:
                    progress = 0;
            }
            
            const completed = typeof challenge.target === 'number' ? progress >= challenge.target : progress > 0;
            
            return {
                ...challenge,
                progress: Math.min(progress, typeof challenge.target === 'number' ? challenge.target : 1),
                completed
            };
        });
        
        setDailyChallenges(updatedChallenges);
        localStorage.setItem(`dailyChallenges_${new Date().toDateString()}`, JSON.stringify(updatedChallenges));
    }, [todos, dailyChallenges.length]);
    
    const completedChallenges = dailyChallenges.filter(c => c.completed).length;
    const totalXpFromChallenges = dailyChallenges.filter(c => c.completed).reduce((sum, c) => sum + c.xp, 0);
    
    const addQuickQuest = (questData) => {
        addTodo({
            isCompleted: false,
            title: questData.title,
            priority: questData.priority,
            category: questData.category || 'general',
            estimatedTime: questData.estimatedTime || 30
        });
        saveToLocal();
    };
    
    const quickQuests = [
        { title: "Review daily goals", priority: "medium", category: "personal", estimatedTime: 15 },
        { title: "Check emails", priority: "medium", category: "work", estimatedTime: 20 },
        { title: "Take a 10-minute break", priority: "low", category: "health", estimatedTime: 10 },
        { title: "Learn something new", priority: "medium", category: "learning", estimatedTime: 30 },
        { title: "Organize workspace", priority: "low", category: "work", estimatedTime: 15 },
        { title: "Connect with a friend", priority: "low", category: "social", estimatedTime: 20 },
    ];
    
    return (
        <>
            {/* Only show button if not controlled externally */}
            {isOpen === undefined && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl z-30 flex items-center gap-2"
                >
                    <span className="text-2xl">📋</span>
                    <span className="font-bold">{completedChallenges}/3</span>
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
                                        📋 Daily Quest Log
                                    </h2>
                                    <p className="text-gray-400 mt-1">
                                        Complete daily challenges to earn bonus XP!
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
                            
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    🎯 Daily Challenges
                                </h3>
                                <div className="space-y-4">
                                    {dailyChallenges.map((challenge, index) => {
                                        const progressPercent = typeof challenge.target === 'number' 
                                            ? (challenge.progress / challenge.target) * 100
                                            : challenge.progress * 100;
                                        
                                        return (
                                            <motion.div
                                                key={challenge.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`p-4 rounded-xl border-2 ${
                                                    challenge.completed
                                                        ? 'bg-green-900/30 border-green-500'
                                                        : 'bg-gray-700/50 border-gray-600'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                                        {challenge.completed ? '✅' : '⏳'} {challenge.title}
                                                    </h4>
                                                    <span className="text-yellow-400 font-bold">+{challenge.xp} XP</span>
                                                </div>
                                                
                                                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progressPercent}%` }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        className={`h-2 rounded-full ${
                                                            challenge.completed 
                                                                ? 'bg-green-500' 
                                                                : 'bg-blue-500'
                                                        }`}
                                                    />
                                                </div>
                                                
                                                <p className="text-sm text-gray-400">
                                                    Progress: {challenge.progress}/{typeof challenge.target === 'number' ? challenge.target : 1}
                                                    {challenge.completed && ' - Completed! 🎉'}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                
                                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-white font-bold">Today's Progress</h4>
                                            <p className="text-gray-300">{completedChallenges}/3 challenges completed</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-yellow-400">+{totalXpFromChallenges} XP</div>
                                            <div className="text-sm text-gray-400">Bonus earned</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    ⚡ Quick Quest Suggestions
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {quickQuests.map((quest, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + index * 0.05 }}
                                            className="p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-white">{quest.title}</h4>
                                                <span className="text-xs text-gray-400">{quest.estimatedTime}m</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded text-xs ${
                                                        quest.priority === 'urgent' ? 'bg-red-500' :
                                                        quest.priority === 'high' ? 'bg-orange-500' :
                                                        quest.priority === 'medium' ? 'bg-blue-500' : 'bg-green-500'
                                                    }`}>
                                                        {quest.priority}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{quest.category}</span>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => addQuickQuest(quest)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Add Quest
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default QuestLog

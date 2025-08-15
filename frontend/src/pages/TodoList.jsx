import React, { useState, useEffect } from 'react'
import { todoStore } from '../zustand/store'
import InputField from '../components/InputField';
import TodoRender from '../layouts/TodoRender';
import ProgressBar from '../components/ProgressBar';
import FloatingButtons from '../components/FloatingButtons';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = () => {
    const { todos, addTodo, removeTodo, markAsComplete, saveToLocal, playerStats } = todoStore();
    const [todo, setTodo] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("general");
    const [estimatedTime, setEstimatedTime] = useState(30);
    const [showAchievement, setShowAchievement] = useState(null);
    const [levelUpAnimation, setLevelUpAnimation] = useState(false);
    const [lastLevel, setLastLevel] = useState(playerStats.level);
    
    useEffect(() => {
        if (playerStats.level > lastLevel) {
            setLevelUpAnimation(true);
            setTimeout(() => setLevelUpAnimation(false), 3000);
            setLastLevel(playerStats.level);
        }
    }, [playerStats.level, lastLevel]);
    
    useEffect(() => {
        const newAchievements = playerStats.achievements.filter(a => !localStorage.getItem(`shown_${a.id}`));
        if (newAchievements.length > 0) {
            const achievement = newAchievements[0];
            setShowAchievement(achievement);
            localStorage.setItem(`shown_${achievement.id}`, 'true');
            setTimeout(() => setShowAchievement(null), 4000);
        }
    }, [playerStats.achievements]);
    
    const handleClick = () => {
        if (!todo.trim()) {
            return;
        }
        const newTodo = {
            isCompleted: false,
            title: todo,
            priority,
            category,
            estimatedTime: parseInt(estimatedTime)
        }
        addTodo(newTodo);
        saveToLocal();
        setTodo("");
    }
    
    const onChange = (e) => {
        setTodo(e.target.value)
    }
    
    const getPriorityColor = (priority) => {
        const colors = {
            low: 'from-green-500 to-green-600',
            medium: 'from-blue-500 to-blue-600', 
            high: 'from-orange-500 to-orange-600',
            urgent: 'from-red-500 to-red-600'
        };
        return colors[priority] || colors.medium;
    }
    
    const getXpProgress = () => {
        const totalXpForCurrentLevel = playerStats.level * 100;
        return (playerStats.xp / totalXpForCurrentLevel) * 100;
    }
    
    return (
       <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col max-w-6xl mx-auto w-full p-2 sm:p-4 relative"
       >
         <AnimatePresence>
           {levelUpAnimation && (
             <motion.div
               initial={{ opacity: 0, scale: 0.5, y: -50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.5, y: 50 }}
               className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
             >
               <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-xl sm:text-2xl md:text-3xl font-bold shadow-2xl text-center">
                 🎉 LEVEL UP! 🎉<br/>
                 <span className="text-lg sm:text-xl">Level {playerStats.level}</span>
               </div>
             </motion.div>
           )}
         </AnimatePresence>

         <AnimatePresence>
           {showAchievement && (
             <motion.div
               initial={{ opacity: 0, x: 300 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 300 }}
               className="fixed top-4 right-2 sm:right-4 z-40 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 sm:p-4 rounded-xl shadow-2xl max-w-xs sm:max-w-sm"
             >
               <div className="flex items-center gap-2 sm:gap-3">
                 <span className="text-xl sm:text-2xl">{showAchievement.icon}</span>
                 <div>
                   <h4 className="font-bold text-sm sm:text-base">{showAchievement.name}</h4>
                   <p className="text-xs sm:text-sm opacity-90">{showAchievement.description}</p>
                 </div>
               </div>
             </motion.div>
           )}
         </AnimatePresence>

         <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-white"
         >
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
             <div className="text-center col-span-1 sm:col-span-2 md:col-span-1">
               <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                 Level {playerStats.level}
               </h3>
               <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 mt-1 sm:mt-2">
                 <div 
                   className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                   style={{ width: `${getXpProgress()}%` }}
                 ></div>
               </div>
               <p className="text-xs sm:text-sm mt-1">{playerStats.xp}/{playerStats.xpToNextLevel} XP</p>
             </div>
             
             <div className="text-center">
               <h4 className="text-sm sm:text-lg md:text-xl font-semibold text-orange-400">🔥 Streak</h4>
               <p className="text-lg sm:text-xl md:text-2xl font-bold">{playerStats.streak} days</p>
               <p className="text-xs sm:text-sm text-gray-300">Best: {playerStats.longestStreak}</p>
             </div>
             
             <div className="text-center">
               <h4 className="text-sm sm:text-lg md:text-xl font-semibold text-green-400">✅ Completed</h4>
               <p className="text-lg sm:text-xl md:text-2xl font-bold">{playerStats.totalCompleted}</p>
               <p className="text-xs sm:text-sm text-gray-300">Total Quests</p>
             </div>
             
             <div className="text-center">
               <h4 className="text-sm sm:text-lg md:text-xl font-semibold text-blue-400">🏆 Achievements</h4>
               <p className="text-lg sm:text-xl md:text-2xl font-bold">{playerStats.achievements.length}</p>
               <p className="text-xs sm:text-sm text-gray-300">Unlocked</p>
             </div>
           </div>
         </motion.div>
         
         <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6"
         >
           <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
             ⚔️ Create New Quest
           </h2>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
             <div className="lg:col-span-2 xl:col-span-2">
               <InputField
                   name="todo"
                   placeholder="Enter your epic quest..."
                   onChange={onChange}
                   value={todo}
                   label="Quest Title"
               />
             </div>
             
             <div>
               <label className="block text-white text-xs sm:text-sm font-bold mb-2">Priority Level</label>
               <select 
                 value={priority} 
                 onChange={(e) => setPriority(e.target.value)}
                 className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-2 sm:px-3 py-2 text-sm"
               >
                 <option value="low">🟢 Low (+10 XP)</option>
                 <option value="medium">🔵 Medium (+25 XP)</option>
                 <option value="high">🟠 High (+50 XP)</option>
                 <option value="urgent">🔴 Urgent (+100 XP)</option>
               </select>
             </div>
             
             <div>
               <label className="block text-white text-xs sm:text-sm font-bold mb-2">Category</label>
               <select 
                 value={category} 
                 onChange={(e) => setCategory(e.target.value)}
                 className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-2 sm:px-3 py-2 text-sm"
               >
                 <option value="general">📋 General</option>
                 <option value="work">💼 Work</option>
                 <option value="personal">👤 Personal</option>
                 <option value="health">💪 Health</option>
                 <option value="learning">📚 Learning</option>
                 <option value="social">👥 Social</option>
               </select>
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-end">
             <div className="flex-grow w-full sm:w-auto">
               <label className="block text-white text-xs sm:text-sm font-bold mb-2">Estimated Time (minutes)</label>
               <input
                 type="number"
                 min="5"
                 max="480"
                 step="5"
                 value={estimatedTime}
                 onChange={(e) => setEstimatedTime(e.target.value)}
                 className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-2 sm:px-3 py-2 text-sm"
               />
             </div>
             
             <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className={`bg-gradient-to-r ${getPriorityColor(priority)} text-white px-4 sm:px-6 py-2 rounded-md h-10 font-bold shadow-lg text-sm sm:text-base w-full sm:w-auto`}
                 onClick={handleClick}
             >
                 🚀 Launch Quest
             </motion.button>
           </div>
         </motion.div>
         
         <div className='w-full px-2 sm:px-4'>
             <ProgressBar />
         </div>
         
         <TodoRender todos={todos} remove={removeTodo} mark={markAsComplete} save={saveToLocal} playerStats={playerStats}/>
         
         <FloatingButtons />
       </motion.div>
    )
}

export default TodoList
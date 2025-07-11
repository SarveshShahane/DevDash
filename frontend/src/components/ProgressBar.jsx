import React, { useEffect } from 'react'
import { todoStore } from '../zustand/store'
import { motion } from 'framer-motion'

const ProgressBar = () => {
    const todos = todoStore((state)=>state.todos)
    const completedTodos = todos.filter(todo => todo.isCompleted).length;
    const total = todos.length;
    let percent = total === 0 ? 0 : (completedTodos /total)*100
    
    return (
        <div className='w-full rounded-full h-4 bg-[#1a1a1a] overflow-hidden mt-4 border border-[#333]'>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5 }}
                className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-full'
            />
            <p className='text-sm text-[#999] mt-1'>{completedTodos} of {total} tasks completed</p>
        </div>
    )
}

export default ProgressBar
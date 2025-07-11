import React from 'react'
import { motion } from 'framer-motion'

const TodoRender = ({ todos, remove, mark, save }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 space-y-4"
        >
            {todos.length > 0 ? (
                todos.map((todo, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="p-4 bg-[#1a1a1a] rounded-md border border-[#333] flex justify-between items-center mb-2"
                    >
                        <p className={`text-[#ffffff] ${todo.isCompleted ? 'line-through text-[#666]' : ""}`}>
                            {todo.title}
                        </p>
                        <div>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-[#2a9d8f] text-white mx-3 px-3 py-1 rounded' 
                                onClick={() => { mark(idx); save(); }}
                                disabled={todo.isCompleted}
                            >
                                {todo.isCompleted ? 'Completed' : 'Complete'}
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-[#e63946] text-white mx-3 px-3 py-1 rounded' 
                                onClick={() => { remove(idx); save(); }}
                            >
                                Delete
                            </motion.button>
                        </div>
                    </motion.div>
                ))
            ) : (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#999] text-center p-4"
                >
                    No todos listed. Add new...
                </motion.p>
            )}
        </motion.div>
    )
}

export default TodoRender
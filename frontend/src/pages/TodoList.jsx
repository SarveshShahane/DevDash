import React, { useState } from 'react'
import { todoStore } from '../zustand/store'
import InputField from '../components/InputField';
import TodoRender from '../layouts/TodoRender';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';

const TodoList = () => {
    const { todos, addTodo, removeTodo, markAsComplete, saveToLocal } = todoStore();
    const [todo, setTodo] = useState("");
    
    const handleClick = () => {
        if (!todo.trim()) {
            return;
        }
        const newTodo = {
            isCompleted: false,
            title: todo,
        }
        addTodo(newTodo);
        saveToLocal();
        setTodo("");
    }
    
    const onChange = (e) => {
        setTodo(e.target.value)
    }
    
    return (
       <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col max-w-2xl mx-auto w-full p-4"
       >
         <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="p-4 flex items-end gap-2"
         >
            <div className="flex-grow">
                <InputField
                    name="todo"
                    placeholder="Enter your todo..."
                    onChange={onChange}
                    value={todo}
                    label="New Todo"
                />
            </div>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-[#3498db] text-white px-4 py-2 rounded-md h-10'
                onClick={handleClick}
            >
                Add
            </motion.button>
        </motion.div>
        <div className='w-full px-4'>
            <ProgressBar />
        </div>
        <TodoRender todos={todos} remove={removeTodo} mark={markAsComplete} save={saveToLocal}/>
       </motion.div>
    )
}

export default TodoList
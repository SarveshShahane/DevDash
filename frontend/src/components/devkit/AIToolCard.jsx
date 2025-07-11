import React from 'react'

import { motion } from 'framer-motion'
import { ExternalLink, } from 'lucide-react';
const AIToolCard = ({ index, name, icon, category, url, description }) => {
    return (
        <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className='bg-gray-900 p-4 rounded-lg border-gray-700 hover:border-blue-500 transition-all'
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <span className="text-2xl mr-3">{icon}</span>
                    <div>
                        <h3 className="text-white font-medium">{name}</h3>
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
                            {category}
                        </span>
                    </div>
                </div>
                <a href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300">
                    <ExternalLink className='h-5 w-5' />
                </a>
            </div>
                <p className='text-sm text-gray-400 t-2 '>{description}</p>
        </motion.div>
    )
}

export default AIToolCard
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
const BookMarkCard = ({ index, name, url, category }) => {
    return (
        <AnimatePresence>
            <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='bg-gray-900 p-4 rounded-lg border-gray-700 hover:border-blue-500 transition-all'
            >
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div>
                            <h3 className="mr-3 text-white font-medium">{name}</h3>
                             {category && (
                            <span className="text-xs bg-amber-900/50 text-amber-300 px-2 py-0.5 rounded-full">
                                {category}
                            </span>
                        )}
                        </div>
                    </div>
                    <a href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300">
                        <ExternalLink className='h-5 w-5' />
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default BookMarkCard
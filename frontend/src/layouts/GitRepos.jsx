import React from 'react'
import RepoCard from '../components/github/RepoCard'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GitRepos = ({ repos }) => {
    const [sortBy, setSortBy] = useState('stars')
    const [expand, setExpand] = useState(false)
    const num = 4
    
    const sortedRepos = useMemo(() => {
        if (!repos || !repos.length) return []

        return [...repos].sort((a, b) => {
            if (sortBy === 'stars') return b.stars - a.stars
            if (sortBy === 'forks') return b.forks - a.forks
            return 0
        })
    }, [repos, sortBy])
    
    const displayRepos = expand ? sortedRepos : sortedRepos.slice(0, num)
    const more = sortedRepos.length > num
    
    return (
        <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-col  sm:flex-row justify-evenly items-start sm:items-center p-2 sm:px-4 sm:py-2">
                <h1 className='text-white text-xl font-semibold mb-2 sm:mb-0'>Repositories</h1>
                
                <div className="flex items-center space-x-2">
                    <span className='text-sm text-gray-400'>Sort By:</span>
                    <div className="flex rounded overflow-hidden">
                        <button
                            className={`px-3 py-1 text-sm ${sortBy === 'stars'
                                ? 'bg-[#3498db] text-white'
                                : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]'}`}
                            onClick={() => setSortBy('stars')}
                        >
                            Stars
                        </button>
                        <button
                            className={`px-3 py-1 text-sm ${sortBy === 'forks'
                                ? 'bg-[#3498db] text-white'
                                : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]'}`}
                            onClick={() => setSortBy('forks')}
                        >
                            Forks
                        </button>
                    </div>
                </div>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4 md:gap-5 lg:gap-6'>
                <AnimatePresence>
                    {displayRepos.map((repo, index) => (
                        <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                duration: 0.3,
                                delay: Math.min(index * 0.1, 0.5), // Cap delay for better performance
                                ease: "easeOut"
                            }}
                            className="flex "
                        >
                            <RepoCard repo={repo} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {/* No repositories message */}
            {displayRepos.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-400">No repositories found</p>
                </div>
            )}
            
            {/* Show more/less button */}
            {more && (
                <div className='flex justify-center mt-4'>
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onClick={() => setExpand(!expand)}
                        transition={{ duration: 0.6 }}
                        className='px-4 py-2 bg-[#1a1a1a] text-[#06b6d4] hover:bg-[#252525] rounded-md'
                    >
                        {expand ? 'Show Less' : `Show All (${sortedRepos.length})`}
                    </motion.button>
                </div>
            )}
            
            {/* Repository count indicator */}
            <div className="text-center text-xs text-gray-400 pb-2">
                Showing {displayRepos.length} of {sortedRepos.length} repositories
            </div>
        </div>
    )
}

export default GitRepos
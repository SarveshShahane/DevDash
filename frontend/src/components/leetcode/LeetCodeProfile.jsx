import React from 'react'
import { useLeetCodeStore } from '../../zustand/store'
import { motion } from 'framer-motion'
import { fadeIn } from '../../animations/animations'
import TypingText from '../TypingText'
import { languageColors } from '../../utils/segmentColors'

const LeetCodeProfile = () => {
    const { leetCodeData } = useLeetCodeStore()
    
    const profile = leetCodeData?.profile || {}
    const username = leetCodeData?.username || 'Unknown'
    const languages = leetCodeData?.languages || []
    
    const {
        ranking = 'N/A',
        realName = username,
        reputation = 'N/A',
        starRating = 'N/A',
        userAvatar = '/default-avatar.png'
    } = profile
    
    const langProblems = languages.length > 0 ? 
        languages.reduce((prev, curr) => prev + (curr.problemsSolved || 0), 0) : 0
    
    const langMap = languages.length > 0 ? 
        languages.map((lang) => ({
            language: lang.languageName || 'Unknown',
            percent: langProblems === 0 ? 0 : ((lang.problemsSolved || 0) / langProblems * 100).toFixed(1)
        })).filter(lang => parseFloat(lang.percent) > 0) : []
    
    const url = `https://leetcode.com/u/${username}`
    
  
    return (
        <motion.div
            className='flex flex-col space-y-3 mt-2 sm:mt-5 w-full max-w-sm mx-auto lg:max-w-xs p-4 sm:p-5 rounded-xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-lg shadow-gray-950/20'>
            
            <motion.div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-2 sm:mb-3">
                <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-70 blur-sm"
                    animate={{ rotate: [0, 360] }} 
                    transition={{ 
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 8,
                        ease: "linear"
                    }}
                />
                {userAvatar && userAvatar !== '/default-avatar.png' ? (
                    <motion.img
                        initial={fadeIn.initial}
                        animate={fadeIn.animation}
                        transition={fadeIn.transition}
                        src={userAvatar} 
                        alt="userAvatar"
                        className='rounded-full absolute inset-1 object-cover w-[94%] h-[94%] border-2 border-gray-800'
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                        }}
                    />
                ) : null}
                
                <div className={`absolute inset-1 w-[94%] h-[94%] rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg sm:text-2xl ${userAvatar && userAvatar !== '/default-avatar.png' ? 'hidden' : 'flex'}`}>
                    {(realName || username).charAt(0).toUpperCase()}
                </div>
            </motion.div>

            <motion.h2 className='text-center font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
                <TypingText text={realName || username} />
            </motion.h2>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col bg-gray-900/60 border border-gray-700/50 text-base sm:text-lg space-y-1 sm:space-y-2 p-2 rounded-lg shadow-md text-white">
                    <p className='self-center text-xs sm:text-sm text-gray-400'>Global Rank</p>
                    <p className='self-center font-medium text-sm sm:text-base'>{ranking !== 'N/A' ? `#${ranking}` : 'N/A'}</p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col bg-gray-900/60 border border-gray-700/50 text-base sm:text-lg space-y-1 sm:space-y-2 p-2 rounded-lg shadow-md text-white">
                    <p className='self-center text-xs sm:text-sm text-gray-400'>Star Rating</p>
                    <p className='self-center font-medium text-sm sm:text-base'>{starRating !== 'N/A' ? `${starRating}⭐` : 'N/A'}</p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col bg-gray-900/60 border border-gray-700/50 text-base sm:text-lg space-y-1 sm:space-y-2 p-2 rounded-lg shadow-md text-white col-span-2">
                    <p className='self-center text-xs sm:text-sm text-gray-400'>Reputation</p>
                    <p className='self-center font-medium text-sm sm:text-base'>{reputation !== 'N/A' ? reputation : 'N/A'}</p>
                </motion.div>
            </div>
            
            {langMap.length > 0 ? (
                <>
                    <div className="mt-2 sm:mt-3 mb-1">
                        <h3 className="text-xs sm:text-sm text-gray-400 mb-2">Languages Used ({langProblems} problems)</h3>
                        <motion.div className='flex overflow-hidden h-2 rounded-full bg-gray-700/70'>
                            {langMap.map((lang, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${lang.percent}%` }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    style={{
                                        backgroundColor: languageColors[lang.language] || '#a0a0a0',
                                        width: `${lang.percent}%`
                                    }}
                                    title={`${lang.language}: ${lang.percent}%`}
                                />
                            ))}
                        </motion.div>
                    </div>
                    
                    <div className='flex gap-2 sm:gap-3 flex-wrap my-2'>
                        {langMap.slice(0, 6).map((lang, i) => (
                            <div key={i} className="flex items-center text-xs space-x-1">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className='rounded-full w-2 h-2'
                                    style={{ backgroundColor: languageColors[lang.language] || '#a0a0a0' }}
                                />
                                <motion.span
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className='text-gray-300'
                                >
                                    {lang.language} <span className="text-gray-500">{lang.percent}%</span>
                                </motion.span>
                            </div>
                        ))}
                        {langMap.length > 6 && (
                            <div className="text-xs text-gray-400">+{langMap.length - 6} more</div>
                        )}
                    </div>
                </>
            ) : (
                <div className="mt-2 sm:mt-3 mb-3 sm:mb-4 text-center">
                    <div className="text-gray-400 text-xs">No language data available</div>
                </div>
            )}
            
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 w-full px-3 py-2 rounded-md font-medium text-white shadow-md mt-2 text-sm sm:text-base'
            >
                <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    Visit LeetCode Profile
                </a>
            </motion.button>
        </motion.div>
    )
}

export default LeetCodeProfile
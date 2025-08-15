import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TypingText from '../TypingText'
import { languageColors } from '../../utils/segmentColors'
const GitProfile = ({ profile, loading, forks, stars, langData }) => {
    if (!profile || loading) return
    const [expandedBio, setExpandedBio] = useState(false);
    const desc = typeof profile.bio === 'string' ? profile.bio : 'No description provided...'
    const isLongDesc = desc.length > 80;
    const displayDesc = expandedBio || !isLongDesc ? desc : `${desc.substring(0, 80)}...`;

    const createdDate = profile.created_at ? new Date(profile.created_at) : null;
    const updatedDate = profile.updated_at ? new Date(profile.updated_at) : null;
    const langArr = Object.entries(langData).map(([lang, bytes]) => ({
        lang,
        bytes,
    }))
    const totalBytes = langArr.reduce((acc, { bytes }) => acc + bytes, 0)
    const segments = Object.entries(langData).map(([lang, bytes]) => ({
        lang,
        percent: (bytes / totalBytes) * 100
    }))
    return (
        <motion.div className='flex flex-col w-full max-w-xs xl:max-w-none bg-gray-800/50 border border-gray-700/50 backdrop-blur-md shadow-xl shadow-gray-950/20 p-4 sm:p-5 rounded-xl space-y-3 sm:space-y-4 h-max'>
            <div className="flex flex-col items-center">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{ duration: 0.7 }} src={profile.avatar}
                    alt="avatar"
                    className='rounded-full mb-2 sm:mb-3 border-2 border-purple-500/50 shadow-lg shadow-purple-900/20'
                    width={80}
                    height={80}
                />
                <motion.h2 className='git-username font-bold text-sm sm:text-base'><TypingText text={profile.username}></TypingText></motion.h2>
                <div className='git-bio text-center text-[#cccccc] text-xs sm:text-sm'>
                    {displayDesc}
                    {isLongDesc && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='text-[#8b5cf6] ml-1 cursor-pointer text-xs'
                            onClick={() => setExpandedBio(!expandedBio)}
                        >
                            {expandedBio ? 'show less' : 'read more'}
                        </motion.button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50 text-center">
                    <p className='text-xs text-gray-400'>Followers</p>
                    <p className='font-bold text-white text-sm sm:text-base'>{profile.followers}</p>
                </div>
                <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50 text-center">
                    <p className='text-xs text-gray-400'>Following</p>
                    <p className='font-bold text-white text-sm sm:text-base'>{profile.following}</p>
                </div> 
                <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50 text-center">
                    <p className='text-xs text-gray-400'>Stars</p>
                    <p className='font-bold text-yellow-400 text-sm sm:text-base'>{stars}</p>
                </div> 
                <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50 text-center">
                    <p className='text-xs text-gray-400'>Forks</p>
                    <p className='font-bold text-blue-400 text-sm sm:text-base'>{forks}</p>
                </div>
                <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700/50 text-center col-span-2">
                    <p className='text-xs text-gray-400'>Public Repositories</p>
                    <p className='font-bold text-white text-sm sm:text-base'>{profile.public_repos}</p>
                </div>
            </div>
            <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                {createdDate && (
                    <p className='text-[#cccccc] text-xs flex items-center'>
                        <span className="mr-2">🚀</span>
                        Joined: {createdDate.toLocaleDateString('en-us', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                )}

                {updatedDate && (
                    <p className='text-[#cccccc] text-xs flex items-center'>
                        <span className="mr-2">🔄</span>
                        Last active: {updatedDate.toLocaleDateString('en-us', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                )}
            </div>
            <div className="flex bg-gray-800/80 h-2 rounded-full overflow-hidden border border-gray-700/50">
                {segments.map(s => (
                    <motion.div
                        key={s.lang}
                        style={{
                            width: `${s.percent}%`,
                            backgroundColor: languageColors[s.lang] || '#858585'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.percent}%` }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        title={`${s.lang}: ${s.percent.toFixed(1)}%`}
                    ></motion.div>
                ))
                }
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 mb-3 sm:mb-4">
                {segments.map((s, idx) => (
                    <div key={idx} className="flex items-center text-xs">
                        <motion.span
                            className='w-2 h-2 rounded-full mr-1'
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            style={{
                                backgroundColor: languageColors[s.lang] || '#858585'
                            }}
                        ></motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-gray-300 text-xs">
                            {s.lang} {s.percent.toFixed(1)}%
                        </motion.span>
                    </div>
                ))}
            </div>
            <motion.a
                href={profile.html_url || profile.url}
                whileHover={{ scale: 1.03, backgroundColor: '#7c3aed' }}
                whileTap={{ scale: 0.97 }}
                className='px-3 py-2 bg-purple-600 text-white w-full rounded-lg font-medium text-center mt-auto shadow-lg shadow-purple-900/20 transition-all duration-300 text-sm'
            >
                View on GitHub
            </motion.a>
        </motion.div>
    )
}

export default GitProfile
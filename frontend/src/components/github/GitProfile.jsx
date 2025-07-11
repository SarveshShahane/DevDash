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
        <motion.div className='flex flex-col w-full max-w-xs git-profile p-4 rounded-lg  space-y-4 h-max '>
            <div className="flex flex-col items-center  b-4">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        border: '1px solid #8b5cf6',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                        scale: 1
                    }}
                    transition={{ duration: 0.7 }} src={profile.avatar}
                    alt="avatar"
                    className='rounded-full mb-3 '
                    width={100}
                    height={100}
                />
                <motion.h2 className='git-username font-bold'><TypingText text={profile.username}></TypingText></motion.h2>
                <div className='git-bio text-center text-[#cccccc] text-sm'>
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
            <div className="grid grid-cols-2 gap-2 mb-4  ">
                <div className="git-info text-center rounded p-2">
                    <p className='text-xs'>Followers</p>
                    <p className='font-bold'>{profile.followers}</p>
                </div>
                <div className="git-info text-center rounded p-2">
                    <p className='text-xs'>Following</p>
                    <p className='font-bold'>{profile.following}</p>
                </div> <div className="git-info text-center rounded p-2">
                    <p className='text-xs'>Stars</p>
                    <p className='font-bold'>{stars}</p>
                </div> <div className="git-info text-center rounded p-2">
                    <p className='text-xs'>Forks</p>
                    <p className='font-bold'>{forks}</p>
                </div>
                <div className="git-info text-center rounded p-2 col-span-2">
                    <p className='text-xs'>Public Repositories</p>
                    <p className='font-bold'>{profile.public_repos}</p>
                </div>
            </div>
            <div className="space-y-2 mb-4">
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
            <div className="flex bg-gray-800 h-2 rounded overflow-hidden">
                {segments.map(s => (
                    <motion.div
                        key={s.lang}
                        style={{
                            width: `${s.percent}%`,
                            backgroundColor: languageColors[s.lang] || '#858585'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.percent}%` }}
                        transition={{ duration0: 6, ease: 'easeInOut' }}
                        title={`${s.lang}: ${s.percent.toFixed(1)}%`}
                    ></motion.div>
                ))
                }
            </div>
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
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
                            className="text-gray-300">
                            {s.lang} {s.percent.toFixed(1)}%
                        </motion.span>
                    </div>
                ))}
            </div>
            <motion.a
                href={profile.html_url || profile.url}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='px-3 py-2 bg-[#8b5cf6] text-white w-full rounded font-medium text-center mt-auto'
            >
                View on GitHub
            </motion.a>
        </motion.div>
    )
}

export default GitProfile
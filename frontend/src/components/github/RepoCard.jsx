import React, { useState } from 'react'
import { easeInOut, motion, percent, rgba } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { languageColors } from '../../utils/segmentColors.js'
import TypingText from '../TypingText.jsx'
import { Stars, GitFork, Star } from 'lucide-react'
import { StarIcon } from 'lucide-react'
const RepoCard = ({ repo, loading }) => {
    const [expanded, setExpanded] = useState(false);

    if (loading || !repo) return
    const { name, forks, description, homepage, languages, primary_language, stars, url } = repo
    const desc = typeof description === 'string' ? description : 'No description provided...'
    const isLongDesc = desc.length > 130;
    const displayDesc = expanded ? desc : `${desc.substring(0, 130)}${isLongDesc ? '...' : ''}`;

    const sort_lang = Object.entries(languages).sort((a, b) => b[1] - a[1])
    const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0)
    const segments = Object.entries(languages).map(([lang, bytes]) => ({
        lang,
        percent:totalBytes===0?0: (bytes / totalBytes) * 100
        
    }))
    return (
   <motion.div
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ translateY: -2, boxShadow: '1px 5px 12px rgba(0,255,135,0.4)' }}
    className='flex flex-col w-60 repo-card ml-10 rounded-md space-y-4 overflow-hidden  p-2'>
    <motion.h2 className='repository text-white font-semibold'><TypingText text={name} /></motion.h2>
    
    <div className='text-[#cccccc] text-sm mb-3 px-2  min-h-[60px]'>
        {displayDesc}
        {isLongDesc && (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='text-[#3498db] ml-1 cursor-pointer'
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? 'show less' : 'read more'}
            </motion.button>
        )}
    </div>

            <div className="flex justify-between items-center text-sm my-2">
                <div className="flex items-center gap-1">
                    <StarIcon size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-300">{stars}</span>
                </div>
                <div className="flex items-center gap-1">
                    <GitFork size={16} className="text-blue-400" />
                    <span className="text-gray-300">{forks}</span>
                </div>
            </div>
            <div className="flex bg-gray-800 h-2 rounded-lg overflow-hidden">
                {segments.map(s => (
                    <motion.div
                        key={s.lang}
                        style={{
                            width: `${s.percent}%`,
                            backgroundColor: languageColors[s.lang] || "#858585"
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.percent}%` }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        title={`${s.lang}: ${s.percent.toFixed(1)}%`}
                    >
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {segments.slice(0, 3).map((s, idx) => (
                    <div key={idx} className="flex items-center text-xs">
                        <motion.span
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-2 h-2 rounded-full mr-1 "
                            style={{
                                backgroundColor: languageColors[s.lang] || "#858585"
                            }}

                        ></motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-gray-300">
                            {s.lang} {s.percent.toFixed(1)}%
                        </motion.span>
                    </div>
                ))}
                {segments.length > 3 && (
                    <span className="text-gray-400 text-xs">+{segments.length - 3} more</span>
                )}
            </div>
            <div className="flex justify-between">
                {homepage && <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className='px-3 py-1 bg-green-600  hover:bg-green-500 w-max rounded font-medium'><a href={homepage}>Live</a></motion.button>
                }
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className='px-3 py-1 bg-gray-600 hover:bg-gray-700  w-max rounded font-medium'><a href={url}>Github</a></motion.button>
            </div>
        </motion.div>
    )
}

export default RepoCard
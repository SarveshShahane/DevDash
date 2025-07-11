import React from 'react'
import { useLeetCodeStore } from '../../zustand/store'
import { motion } from 'framer-motion'
import { fadeIn } from '../../animations/animations'
import TypingText from '../TypingText'
import { languageColors } from '../../utils/segmentColors'
const LeetCodeProfile = () => {

    const { leetCodeData } = useLeetCodeStore()
    const { profile, username, languages } = leetCodeData
    const { ranking, realName, reputation, starRating, userAvatar } = profile
    const langProblems = languages.reduce((prev, curr) => (prev + curr.problemsSolved), 0)
    const langMap = languages.map((lang) => (
        {
            language: lang.languageName,
            percent: langProblems === 0 ? 0 : ((lang.problemsSolved / langProblems) * 100).toFixed(1)
        }
    ))
    const url = `https://leetcode/us/${username}`
    return (
        <motion.div

            className=' flex leet-profile flex-col space-y-3  mt-5  rounded-md  max-w-xs p-4'>
            <motion.img
                initial={fadeIn.initial}
                animate={fadeIn.animation}
                transition={fadeIn.transition}
                src={userAvatar} alt="userAvatar"
                width={150}
                height={150}
                className='rounded-full leetcode-pic self-center'
            />

            <motion.h2
                className='text-[#ffffff] text-center font-bold  text-xl '
            ><TypingText text={realName} /></motion.h2>
            <div className="grid grid-cols-2 gap-2 mb-4  ">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col bg-[#1a1a1a] text-xl space-y-3  rounded-md hover:border text-[#a0a0a0] ">
                    <p className='self-center mt-1' >Global rank</p>
                    <p className='self-center mb-1'>{ranking}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col bg-[#1a1a1a] text-xl space-y-3  rounded-md hover:border text-[#a0a0a0]">
                    <p className='self-center mt-1' >Star Rating</p>
                    <p className='self-center mb-1'>{starRating}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col bg-[#1a1a1a] text-xl space-y-3 col-span-2 rounded-md hover:border text-[#a0a0a0]" >
                    <p className='self-center mt-1' >Reputation</p>
                    <p className='self-center mb-1'>{reputation}</p>
                </motion.div>
            </div>
            <motion.div
                className='flex overflow-hidden h-2  rounded-full bg-[#a0a0a0]'
            >
                {langMap &&
                    langMap.map((lang,i) => (

                        <motion.div
                        key={i}
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.percent}%` }}
                            transition={{ duration: 0.6 }}
                            style={{
                                backgroundColor: languageColors[lang.language] || '#a0a0a0',
                                width: `${lang.percent}%`
                            }}
                            title={`${lang.language} ${lang.percent}%`}
                        >
                        </motion.div>
                    ))
                }
            </motion.div>
            <div className='flex gap-2 flex-wrap'>
                {langMap &&
                    langMap.map((lang,i) => (
                        
                    <div key={i} className="flex items-center text-xs space-x-1">
                        <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className='rounded-full w-2 h-2'
                            style={{ backgroundColor: languageColors[lang.language] || '#a0a0a0' }}
                        ></motion.span>
                         <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className='rounded-full text-[#a0a0a0]'
                        >{lang.language}</motion.span>
                        </div>
                    ))
                }
            </div>
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className='bg-yellow-300 w-max px-3 py-2 rounded-md  font-semibold '
            ><a href={url}>Visit Profile</a></motion.button>
        </motion.div>
    )
}

export default LeetCodeProfile
import React from 'react'
import { useState } from 'react'
import { useUserStore } from '../zustand/store'
import {motion} from 'framer-motion'
const Settings = () => {
    const { github, leetcode, setGitHub, setLeetCode,setToLocal } = useUserStore();
    console.log(github)
    const [gh, setGh] = useState(github)
    const [lc, setLc] = useState(leetcode)
    const handleSave = (e) => {
        setGitHub(gh.trim());
        setLeetCode(lc.trim())
        console.log(leetcode)
        setToLocal()
        
    }

    return (
      <div  className='p-4 space-y-8 settings flex flex-col items-center justify-center mt-5 py-4'>
    <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="group w-full max-w-md flex flex-col gap-2">
        <label htmlFor="github" className='text-[#ffffff] font-medium'>GitHub</label>
        <input
            type="text"
            name='github'
            value={gh}
            onChange={(e) => setGh(e.target.value)}
            className='px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white  inputs w-full'
            placeholder='Enter GitHub username...'
        />
    </motion.div>
    <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="group w-full max-w-md flex flex-col gap-2">
        <label htmlFor="leet" className='text-[#ffffff] font-medium'>LeetCode</label>
        <input
            type="text"
            name='leet'
            value={lc}
            onChange={(e) => setLc(e.target.value)}
            className='px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white  inputs w-full'
            placeholder='Enter LeetCode username...'
        />
    </motion.div>
    <motion.button initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
        Save
    </motion.button>
</div>
    )
}

export default Settings
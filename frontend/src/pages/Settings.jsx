import React from 'react'
import { useState } from 'react'
import { useUserStore } from '../zustand/store'
import {motion} from 'framer-motion'

const Settings = () => {
    const { github, leetcode, setGitHub, setLeetCode, setToLocal } = useUserStore();
    
    const [gh, setGh] = useState(github)
    const [lc, setLc] = useState(leetcode)
    const [saved, setSaved] = useState(false)
    
    const handleSave = (e) => {
        e.preventDefault();
        setGitHub(gh.trim());
        setLeetCode(lc.trim());
        setToLocal();
        setSaved(true);
        
        
        setTimeout(() => setSaved(false), 3000);
    }

    return (
      <div className='p-4 space-y-8 settings flex flex-col items-center justify-center mt-5 py-4'>
        <motion.div 
          initial={{opacity:0,y:-40}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.6}}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-400">Configure your GitHub and LeetCode usernames</p>
        </motion.div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-green-600/20 border border-green-500 rounded-lg p-4 text-green-300 text-center max-w-md w-full"
          >
            ✅ Settings saved successfully!
          </motion.div>
        )}

        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="group w-full max-w-md flex flex-col gap-2">
            <label htmlFor="github" className='text-[#ffffff] font-medium'>GitHub Username</label>
            <input
                type="text"
                name='github'
                value={gh}
                onChange={(e) => setGh(e.target.value)}
                className='px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white inputs w-full focus:border-blue-500 focus:outline-none transition-colors'
                placeholder='Enter GitHub username...'
            />
            <p className="text-xs text-gray-500">Used to fetch your GitHub profile and repository data</p>
        </motion.div>
        
        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="group w-full max-w-md flex flex-col gap-2">
            <label htmlFor="leet" className='text-[#ffffff] font-medium'>LeetCode Username</label>
            <input
                type="text"
                name='leet'
                value={lc}
                onChange={(e) => setLc(e.target.value)}
                className='px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white inputs w-full focus:border-orange-500 focus:outline-none transition-colors'
                placeholder='Enter LeetCode username...'
            />
            <p className="text-xs text-gray-500">Used to fetch your LeetCode profile and submission data</p>
        </motion.div>
        
        <motion.button 
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.5}} 
          whileHover={{scale:1.03}} 
          whileTap={{scale:0.97}}
          onClick={handleSave}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
        >
          Save Settings
        </motion.button>

        <motion.div
          initial={{opacity:0}} 
          animate={{opacity:1}} 
          transition={{duration:0.5, delay: 0.3}}
          className="text-center text-gray-400 text-sm max-w-md"
        >
          <p>💡 <strong>Tip:</strong> Make sure your usernames are correct. The dashboard will automatically fetch and display your latest data once saved.</p>
        </motion.div>
      </div>
    )
}

export default Settings
import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 780)
    }

    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <nav className='w-[95%] sm:w-[90%] md:w-[80%] mt-2 py-1 px-4 sm:px-5 rounded-xl mx-auto nav'>
      <div className='flex justify-between items-center relative'>
        <div className='brand text-xl sm:text-2xl font-bold z-20'>
          Dev.<span className='text-[#06b6d4]'>dash</span>
        </div>

        <button
          className={`z-50 flex flex-col justify-center items-center md:hidden ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        <div className='hidden md:block'>
          <ul className='flex gap-4 text-[#06b6d4]'>
            <li><NavLink className='nav-item ' to="/dash">Dashboard</NavLink></li>
            <li><NavLink className='nav-item ' to="/git">GitHub</NavLink></li>
            <li><NavLink className='nav-item ' to="/leetcode">Leetcode</NavLink></li>
            <li><NavLink className='nav-item ' to="/tasks">Tasks</NavLink></li>
            <li><NavLink className='nav-item ' to="/contests">Contests</NavLink></li>
            <li><NavLink className='nav-item ' to="/devkit">Devkit</NavLink></li>
            <li><NavLink className='nav-item ' to="/settings">Settings</NavLink></li>
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-30 bg-black"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-40 w-64 bg-[#121212] border-l border-gray-800 shadow-xl"
            >
              <div className="flex flex-col h-full py-16 px-6">
                <motion.ul
                  className='flex flex-col gap-6 text-lg'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/dash"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </NavLink></li>

                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/git"
                    onClick={handleLinkClick}
                  >
                    GitHub
                  </NavLink></li>

                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg  transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/leetcode"
                    onClick={handleLinkClick}
                  >
                    Leetcode
                  </NavLink></li>

                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/tasks"
                    onClick={handleLinkClick}
                  >
                    Tasks
                  </NavLink></li>

                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/contests"
                    onClick={handleLinkClick}
                  >
                    Contests
                  </NavLink></li>

                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/devkit"
                    onClick={handleLinkClick}
                  >
                    Devkit
                  </NavLink></li>

                  <li><NavLink
                    className={({ isActive }) => `block py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-[#06b6d41a] text-[#06b6d4]' : 'text-white hover:bg-[#ffffff10]'}`}
                    to="/settings"
                    onClick={handleLinkClick}
                  >
                    Settings
                  </NavLink></li>
                </motion.ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const TypingText = ({ text = "", speed = 50, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("")
    const index=useRef(0)
    useEffect(() => {
        setDisplayedText("")
        index.current=0
        const timeInterval = setInterval(() => {
           if (index.current < text.length) {
     setDisplayedText(prev => text.substring(0, index.current + 1))
      index.current+=1
            } else {
                clearInterval(timeInterval)
            }
        }, speed)
        return () =>
            clearInterval(timeInterval)
    }, [text, speed])
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`font-mono whitespace-pre ${className}`}
        >
            {displayedText}
            {displayedText.length < text.length && (
                <span className='animate-pulse text-white'>|</span>
            )}
        </motion.span>
    )
}

export default TypingText
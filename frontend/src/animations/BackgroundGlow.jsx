import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';


const BackgroundGlow = () => {
  const [reducedMotion] = useReducedMotion();
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[100px]"
        animate={!reducedMotion ? {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-600/5 blur-[100px]"
        animate={!reducedMotion ? {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[100px]"
        animate={!reducedMotion ? {
          opacity: [0.2, 0.4, 0.2],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default BackgroundGlow;

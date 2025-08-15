import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const GlobalBackgroundEffect = () => {
  const [reducedMotion] = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px]"
        animate={!reducedMotion ? {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px]"
        animate={!reducedMotion ? {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-[150px]"
        animate={!reducedMotion ? {
          opacity: [0.2, 0.4, 0.2],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-[0.02] z-[-1]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlobalBackgroundEffect;

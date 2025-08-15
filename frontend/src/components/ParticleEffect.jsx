import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ParticleEffect = ({ trigger, position = { x: 50, y: 50 } }) => {
    const [particles, setParticles] = useState([]);
    
    useEffect(() => {
        if (trigger) {
            const newParticles = Array.from({ length: 15 }, (_, i) => ({
                id: i,
                x: position.x + (Math.random() - 0.5) * 100,
                y: position.y + (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 0.5,
                emoji: ['🎉', '⭐', '✨', '🎊', '💫', '🌟'][Math.floor(Math.random() * 6)]
            }));
            setParticles(newParticles);
            
            setTimeout(() => setParticles([]), 2000);
        }
    }, [trigger, position.x, position.y]);
    
    return (
        <AnimatePresence>
            {particles.map(particle => (
                <motion.div
                    key={particle.id}
                    initial={{ 
                        opacity: 1,
                        scale: particle.scale,
                        x: particle.x,
                        y: particle.y,
                        rotate: particle.rotation
                    }}
                    animate={{
                        opacity: 0,
                        scale: 0,
                        x: particle.x + (Math.random() - 0.5) * 200,
                        y: particle.y - 100 - Math.random() * 100,
                        rotate: particle.rotation + 360
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 1.5,
                        ease: "easeOut"
                    }}
                    className="absolute pointer-events-none text-2xl"
                    style={{ 
                        left: 0,
                        top: 0,
                        zIndex: 1000
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </AnimatePresence>
    )
}

export default ParticleEffect

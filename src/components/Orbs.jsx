import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const Orbs = () => {
    const orbsRef = useRef([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        orbsRef.current.forEach((orb, i) => {
            if (!orb) return;

            // Float animation - Reduced movement on mobile
            gsap.to(orb, {
                y: isMobile ? "+=10" : "+=20",
                duration: isMobile ? 4 + i : 3 + i,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.5
            });

            // Rotation - Disable on mobile if likely to cause paint issues, or slow down
            gsap.to(orb, {
                rotation: 360,
                duration: isMobile ? 40 + i * 10 : 20 + i * 5,
                repeat: -1,
                ease: "none"
            });
        });

        // React to Scroll Velocity - Disable on Mobile for performance
        if (!isMobile) {
            ScrollTrigger.create({
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity());
                    const timeScale = 1 + (velocity / 1500); // Subtle speed up

                    if (orbsRef.current.length > 0) {
                        const tweens = gsap.getTweensOf(orbsRef.current);
                        gsap.to(tweens, {
                            timeScale: timeScale,
                            duration: 0.5,
                            overwrite: true
                        });
                    }
                }
            });
        }

    }, [isMobile]);

    const orbData = [
        { title: "AI Prompt Architect", color: "from-cyan-500 to-blue-500", size: "w-64 h-64" },
        { title: "Robotics Master", color: "from-purple-500 to-pink-500", size: "w-72 h-72" },
        { title: "Problem Solver", color: "from-green-400 to-teal-500", size: "w-56 h-56" }
    ];

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
            {orbData.map((data, i) => (
                <div
                    key={i}
                    ref={el => orbsRef.current[i] = el}
                    className={`absolute rounded-full bg-gradient-to-br ${data.color} opacity-20 blur-3xl mix-blend-screen ${data.size}`}
                    style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                        transform: `translate(-50%, -50%)`
                    }}
                >
                    <div className="w-full h-full rounded-full border border-white/10"></div>
                </div>
            ))}
        </div>
    );
};

export default Orbs;

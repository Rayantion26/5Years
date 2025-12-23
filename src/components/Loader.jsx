import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const barRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simple progress simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for "realistic" feel
                return Math.min(prev + Math.floor(Math.random() * 10) + 1, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Exit Animation
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            tl.to(textRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            })
                .to(barRef.current, {
                    scaleX: 0,
                    transformOrigin: "right",
                    duration: 0.5,
                    ease: "power2.in"
                }, "<") // Simultanous
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut"
                });
        }
    }, [progress, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white font-mono select-none"
        >
            <div className="w-64 relative">
                {/* Text Scramble / Info */}
                <div className="flex justify-between items-end mb-2 text-xs text-neon-cyan/80 tracking-widest">
                    <span>SYSTEM_BOOT</span>
                    <span ref={textRef}>{progress}%</span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                    {/* Active Bar */}
                    <div
                        ref={barRef}
                        className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    ></div>
                </div>

                {/* Decorative sub-text */}
                <div className="mt-4 text-[10px] text-white/30 text-center tracking-[0.2em] animate-pulse">
                    INITIALIZING REALITY...
                </div>
            </div>
        </div>
    );
};

export default Loader;

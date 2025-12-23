import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePhysics } from '../hooks/usePhysics';
import { useIsMobile } from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isLoading }) => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const attributionRef = useRef(null);
    const { applyForce } = usePhysics();
    const isMobile = useIsMobile();

    useEffect(() => {
        // Typewriter Effect
        const text = "My hero is me in 5 years... it keeps me with somebody to keep on chasing.";
        const highlights = ["hero", "5 years", "chasing"];

        // Clear previous content
        textRef.current.innerHTML = "";

        // 1. Split text into segments based on highlights
        // Regex to match exact words, case insensitive
        const regex = new RegExp(`(${highlights.join('|')})`, 'gi');
        const segments = text.split(regex);

        const allChars = [];

        segments.forEach(segment => {
            const isHighlight = highlights.some(h => h.toLowerCase() === segment.toLowerCase());

            // Container for this segment
            const container = document.createElement("span");
            if (isHighlight) {
                container.className = "bg-neon-cyan text-black px-2 mx-1 rounded-sm inline-block"; // 'selected' look
            }

            // Create chars
            segment.split("").forEach(char => {
                const span = document.createElement("span");
                span.innerText = char;
                span.style.opacity = 0; // Default hidden
                container.appendChild(span);
                allChars.push(span);
            });

            textRef.current.appendChild(container);
        });

        // Wait for loading to finish before starting animation
        if (isLoading) return;

        const ctx = gsap.context(() => {
            // 2. Animate all chars sequentially with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top bottom", // Trigger as soon as the top enters the viewport (which is always true on load)
                    end: "bottom top",
                    toggleActions: "play reverse restart reverse",
                }
            });

            tl.to(allChars, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.05,
                ease: "none"
            })
                // Attribution Fade In
                .to(attributionRef.current, {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out"
                }, "+=0.5"); // Slight delay after typing

            // Floating Animation for the container (Independent) (Reduced on Mobile)
            gsap.to(heroRef.current, {
                y: isMobile ? "+=5" : "+=15",
                rotationX: isMobile ? 0 : "+=2",
                rotationY: isMobile ? 0 : "+=2",
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, heroRef);

        return () => ctx.revert();
    }, [isLoading, isMobile]);

    const handleMouseMove = (e) => {
        if (isMobile || !heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const { x, y } = applyForce(
            heroRef.current,
            centerX,
            centerY,
            centerX,
            centerY
        );

        // Apply physics offset
        const xOffset = x - centerX;
        const yOffset = y - centerY;

        gsap.to(heroRef.current, {
            x: xOffset,
            y: yOffset,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <section
            id="hero"
            className="w-full h-screen flex flex-col items-center justify-center relative z-20 perspective-1000"
            onMouseMove={handleMouseMove}
        >
            <div
                ref={heroRef}
                className="
                    relative p-8 md:p-16 max-w-4xl w-full mx-4
                    bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
                    shadow-[0_0_50px_rgba(0,255,255,0.1)]
                    transform-style-3d
                "
            >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6 opacity-50 border-b border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 font-mono text-xs tracking-widest text-white/60">THE_CHASE_V5.EXE</span>
                </div>

                {/* Main Quote */}
                <h1
                    ref={textRef}
                    className="
                        text-3xl md:text-5xl font-display font-bold leading-tight
                        text-transparent text-white
                        min-h-[160px] md:min-h-[120px]
                    "
                >
                </h1>

                {/* Attribution */}
                <div className="mt-6 flex justify-end">
                    <p ref={attributionRef} className="font-mono text-xs text-neon-cyan/60 tracking-widest opacity-0">
                        // REF: MATTHEW_MCCONAUGHEY_ARCHIVES
                    </p>
                </div>

                {/* Status Indicators */}
                <div className="mt-8 flex gap-6 font-mono text-xs text-neon-cyan/80">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
                        TARGET_LOCKED
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-electric-purple rounded-full animate-pulse delay-75"></span>
                        SYNCING_TIMELINE
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

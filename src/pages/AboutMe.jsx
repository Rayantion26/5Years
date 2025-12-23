import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProjectCard from '../components/ProjectCard';

const projects = [
    {
        title: "Arduino Automatic Water Dispenser",
        description: "A sensor-driven hydration system bridging physical computing with hygiene automation.",
        tags: ["C++", "Arduino", "Sensors"]
    },
    {
        title: "RFID Parking System",
        description: "Secure access control system simulating real-world parking logistics using RFID technology.",
        tags: ["IoT", "C++", "Hardware"]
    },
    {
        title: "Game Replicas",
        description: "High-fidelity recreation of Agar.io and Breakout mechanics, focusing on physics and state management.",
        tags: ["Game Dev", "Physics", "Logic"]
    },
    {
        title: "10-bit & Dolby Vision",
        description: "Research into high-dynamic-range color spaces and display technologies for next-gen visual experiences.",
        tags: ["HDR", "Color Theory", "Research"]
    }
];

const AboutMe = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Title Animation with ScrollTrigger
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse"
                }
            });

            // Cards Animation with ScrollTrigger
            // Note: Since cards are in a grid, we might want to trigger them as a group
            // or use simpler sequential triggers. If we want them to "rewind" as a group when scrolling up:

            gsap.from(".project-card", {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%", // Start animating when container top hits 70% of viewport
                    end: "bottom top",
                    toggleActions: "play reverse play reverse"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen pt-32 pb-20 px-4 md:px-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-20 text-center relative z-10">
                <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple text-glow">
                    ARCHIVES & ORIGINS
                </h1>
                <p className="font-mono text-white/50 max-w-2xl mx-auto">
                    The blueprint of the future is written in the experiments of the past.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {projects.map((project, i) => (
                    <div key={i} className="project-card">
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>

            {/* Footer Spacer */}
            <div className="h-32"></div>
        </div>
    );
};

export default AboutMe;

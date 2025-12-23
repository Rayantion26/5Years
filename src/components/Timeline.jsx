import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
    { year: '2026', title: 'Mastering Intent', desc: 'Deep dive into AI Prompt Architectures and Vibe Coding efficiency.' },
    { year: '2027', title: 'Physical Feedback', desc: 'Integrating advanced Robotics (C++) with real-time AI decision-making.' },
    { year: '2028', title: 'Adaptive Architectures', desc: 'Building resilient systems that scale endlessly with personal growth and technological shifts.' },
    { year: '2029', title: 'Systems Lead', desc: 'Orchestrating complex technical departments with high-fidelity project management.' },
    { year: '2030', title: 'The Chase Met', desc: 'Achieving the 5-year vision, only to set a new hero 5 years further.' }
];

const Timeline = () => {
    const sectionRef = useRef(null);
    const beamRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const beam = beamRef.current;
        const cards = cardsRef.current;

        if (!section || !beam) return;

        // Beam Animation: Grows as you scroll through the section
        gsap.fromTo(beam,
            { height: '0%' },
            {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 0.5
                }
            }
        );

        // Cards Animation
        cards.forEach((card, i) => {
            if (!card) return;

            // Drift in
            gsap.fromTo(card,
                { opacity: 0, x: i % 2 === 0 ? -100 : 100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Active/Focus State (Pop when centered)
            gsap.to(card, {
                scale: 1.1,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
                borderColor: 'rgba(0, 255, 255, 0.6)',
                scrollTrigger: {
                    trigger: card,
                    start: 'center center',
                    end: 'center center',
                    scrub: true,
                    // We only want a momentary pop, or a sustained one while near center.
                    // Let's use toggleActions for a simpler approach: enter, leave, enterBack, leaveBack
                    // Actually, scrubbing a timeline for the scale might be smoother.
                }
            });

            // Let's refine the "Pop" - create a separate timeline tied to the card's position
            const popTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: true,
                }
            });

            popTimeline.to(card, {
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.5)',
                ease: 'power1.inOut'
            }).to(card, {
                scale: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                ease: 'power1.inOut'
            });
        });

    }, []);

    return (
        <section
            id="timeline"
            ref={sectionRef}
            className="relative min-h-[200vh] py-32 flex flex-col items-center justify-start overflow-hidden"
        >
            {/* Vertical Beam Container */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-white/5">
                {/* The Beam itself */}
                <div
                    ref={beamRef}
                    className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                ></div>
            </div>

            {/* Milestones */}
            <div className="w-full max-w-5xl relative z-10 flex flex-col gap-48">
                {MILESTONES.map((item, i) => (
                    <div
                        key={i}
                        className={`flex w-full ${i % 2 === 0 ? 'justify-end pr-12 md:pr-24' : 'justify-start pl-12 md:pl-24'}`}
                    >
                        <div
                            ref={el => cardsRef.current[i] = el}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-lg max-w-md w-full relative group transition-colors duration-500"
                        >
                            {/* Year Badge */}
                            <div className="absolute -top-4 -left-4 bg-black border border-cyan-500/50 px-3 py-1 text-cyan-400 font-mono text-sm tracking-widest shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                                {item.year}
                            </div>

                            <h3 className="text-2xl font-bold font-display uppercase mb-2 text-white group-hover:text-cyan-300 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-white/60 font-light leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Decorative Corner */}
                            <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/20"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative Background Glows for the section */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        </section>
    );
};

export default Timeline;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CODE_SNIPPETS = [
    "void setup() {", "tensor input;", "gravity = 0.0;", "while(alive) {",
    "System.out.println", "for(int i=0; i<5; i++)", "import antigravity",
    "Vector3 force;", "if (distance < min) break;", "return null;",
    "ctx.fillStyle", "Math.random()", "#include <future>", "ERROR: 404",
    "delaunay.triangulate", "matrix.invert()", "shatter_threshold",
    "0x5f3759df", "memalloc(2048)", "segfault_prevention", "vibe_check",
    "bg-neon-cyan", "text-black", "gsap.to()", "usePhysics()", "react-dom"
];

const Background = () => {
    const containerRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create particles
        // Increased to 120 for better coverage
        const particleCount = 120;
        particlesRef.current = [];

        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.className = 'absolute text-xs font-mono text-neon-cyan whitespace-nowrap pointer-events-none select-none';
            el.innerText = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];

            // Random initial position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const z = Math.random() * 200 - 100; // Depth
            const opacity = Math.random() * 0.4 + 0.1;

            gsap.set(el, { x, y, z, opacity: opacity });
            container.appendChild(el);

            // Animate drifting
            gsap.to(el, {
                x: `+=${Math.random() * 200 - 100}`,
                y: `+=${Math.random() * 200 - 100}`,
                z: `+=${Math.random() * 100 - 50}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            particlesRef.current.push(el);
        }

        // Mouse parallax
        const parallax = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 50;
            const y = (e.clientY / window.innerHeight - 0.5) * 50;
            // Move container
            gsap.to(container, {
                x: -x,
                y: -y,
                duration: 1,
                ease: "power2.out"
            });
        }

        // Fixed Shard Creator
        const createShard = (original, clipPathValue, props) => {
            const clone = original.cloneNode(true);
            container.appendChild(clone);

            // Apply captured props
            gsap.set(clone, {
                x: props.x,
                y: props.y,
                z: props.z,
                rotation: props.rotation,
                scale: props.scale,
                opacity: props.opacity, // Using captured opacity
                clipPath: clipPathValue,
                left: 0,
                top: 0
            });

            return clone;
        };

        // Realistic Glass Break
        const shatter = (e) => {
            // Vibe Flash & Container Bump
            const flash = document.createElement('div');
            flash.className = 'fixed inset-0 z-50 pointer-events-none bg-cyan-400 mix-blend-overlay';
            document.body.appendChild(flash);

            gsap.fromTo(flash,
                { opacity: 0.8 },
                {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => flash.remove()
                }
            );

            if (containerRef.current) {
                gsap.fromTo(containerRef.current,
                    { filter: 'brightness(2) contrast(1.2)' },
                    { filter: 'brightness(1) contrast(1)', duration: 0.5 }
                );
            }

            const clickX = e.clientX;
            const clickY = e.clientY;
            const radius = 150;

            const targets = particlesRef.current.filter(el => {
                const rect = el.getBoundingClientRect();
                const elCenterX = rect.left + rect.width / 2;
                const elCenterY = rect.top + rect.height / 2;
                const dist = Math.sqrt(Math.pow(clickX - elCenterX, 2) + Math.pow(clickY - elCenterY, 2));
                return dist < radius;
            });

            targets.forEach(target => {
                const currentOpacity = gsap.getProperty(target, "opacity");
                if (currentOpacity < 0.01) return; // Already hidden/broken

                // Capture properties BEFORE hiding
                const props = {
                    x: gsap.getProperty(target, "x"),
                    y: gsap.getProperty(target, "y"),
                    z: gsap.getProperty(target, "z"),
                    rotation: gsap.getProperty(target, "rotation"),
                    scale: gsap.getProperty(target, "scale"),
                    opacity: currentOpacity
                };

                // 1. Determine Cuts (2, 3, or 4 pieces)
                const pieces = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
                const sliceHeight = 100 / pieces;
                const shards = [];

                for (let i = 0; i < pieces; i++) {
                    const start = i * sliceHeight;
                    const end = (i + 1) * sliceHeight;
                    // e.g. polygon(0% 0%, 100% 0%, 100% 33%, 0% 33%)
                    const clip = `polygon(0% ${start}%, 100% ${start}%, 100% ${end}%, 0% ${end}%)`;
                    shards.push(createShard(target, clip, props));
                }

                // 2. Hide Original
                gsap.set(target, { opacity: 0 });

                // 3. Animate Shards
                shards.forEach((shard, i) => {
                    // Visual flare: explode up/down based on index relative to center
                    const centerIndex = (pieces - 1) / 2;
                    const distFromCenter = i - centerIndex;

                    const forceX = (Math.random() - 0.5) * 50;
                    const forceY = distFromCenter * 30 + (Math.random() * 20 - 10);

                    gsap.to(shard, {
                        x: `+=${forceX}`,
                        y: `+=${forceY}`,
                        rotation: `+=${(Math.random() - 0.5) * 40}`,
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.6 + Math.random() * 0.4,
                        ease: "power2.out",
                        onComplete: () => {
                            shard.remove();
                        }
                    });
                });

                // 4. Reappear
                const delay = 1 + Math.random() * 2; // 1-3 seconds

                gsap.delayedCall(delay, () => {
                    // Use fromTo to ensure visibility transition occurs correctly
                    gsap.fromTo(target,
                        { opacity: 0 },
                        {
                            opacity: props.opacity,
                            duration: 0.5,
                            onComplete: () => {
                                // Ensure state is clean
                                gsap.set(target, { opacity: props.opacity });
                            }
                        }
                    );
                });
            });
        };

        // Initialize ScrollTrigger for velocity reaction
        ScrollTrigger.create({
            onUpdate: (self) => {
                const velocity = Math.abs(self.getVelocity());
                const timeScale = 1 + (velocity / 2000); // Increased chaos on fast scroll

                // Adjust global timeScale for particles?
                // Better: adjust the tweens of the particles
                const tweens = gsap.getTweensOf(particlesRef.current);
                gsap.to(tweens, {
                    timeScale: timeScale,
                    duration: 0.5,
                    overwrite: true
                });
            }
        });

        if (!window.parallaxListener) {
            window.addEventListener('mousemove', parallax);
            window.parallaxListener = true;
        }
        window.addEventListener('click', shatter);

        return () => {
            window.removeEventListener('mousemove', parallax);
            window.removeEventListener('click', shatter);
            window.parallaxListener = false;
            container.innerHTML = '';
            particlesRef.current = [];
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{ perspective: '1000px' }}
        >
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
        </div>
    );
};

export default Background;

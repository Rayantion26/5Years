import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const SmartHeader = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show on scroll up or at very top, hide on scroll down
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (headerRef.current) {
            gsap.to(headerRef.current, {
                y: isVisible ? 0 : '-100%',
                duration: 0.4,
                ease: isVisible ? 'back.out(1.7)' : 'power2.in',
            });
        }
    }, [isVisible]);

    const handleScrollToTimeline = (e) => {
        e.preventDefault();
        // Heavy, cinematic scroll
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: "#timeline", offsetY: 0 },
            ease: "power4.inOut"
        });
    };

    const handleScrollToTop = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: 0 },
                ease: "power4.inOut"
            });
        }
    };

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 transition-transform will-change-transform"
        >
            {/* Glass Container */}
            <div className="relative w-full px-8 py-4 bg-black/5 backdrop-blur-xl border-b border-white/10">
                {/* Gradient Border Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                <nav className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo / Home Link */}
                    <Link
                        to="/"
                        onClick={handleScrollToTop}
                        className="text-lg font-bold font-display tracking-widest text-white hover:text-cyan-400 transition-colors uppercase"
                    >
                        [ HOME ]
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex gap-8">
                        <a
                            href="#timeline"
                            onClick={handleScrollToTimeline}
                            className="text-sm font-light tracking-widest text-white/70 hover:text-cyan-400 transition-colors uppercase"
                        >
                            [ 5 YEARS ]
                        </a>

                    </div>
                </nav>
            </div>
        </header>
    );
};

export default SmartHeader;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useMomentumScroll = () => {
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const body = document.body;
        const content = contentRef.current;
        const wrapper = wrapperRef.current;

        if (!content || !wrapper) return;

        let scrollY = 0;
        let currentScroll = 0;
        const ease = 0.05; // Friction

        // Set body height to match content
        const resize = () => {
            body.style.height = `${content.offsetHeight}px`;
        };

        window.addEventListener('resize', resize);
        resize();

        // Animation Loop
        const render = () => {
            // Lerp
            currentScroll += (scrollY - currentScroll) * ease;

            // Firm stop threshold
            if (Math.abs(scrollY - currentScroll) < 0.1) {
                currentScroll = scrollY;
            }

            // Sync Translation
            if (content) {
                gsap.set(content, { y: -currentScroll, force3D: true });
            }

            // Loop
            requestAnimationFrame(render);
        };

        const rafId = requestAnimationFrame(render);

        // Scroll listener
        const onScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
            body.style.height = ''; // Reset
        };
    }, []);

    return { wrapperRef, contentRef };
};

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useIsMobile } from './useIsMobile';

gsap.registerPlugin(ScrollTrigger);

export const useMomentumScroll = () => {
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        // If mobile, do not initialize momentum scroll
        if (isMobile) {
            const body = document.body;
            body.style.height = '';
            return;
        }

        const body = document.body;
        const content = contentRef.current;
        const wrapper = wrapperRef.current;

        if (!content || !wrapper) return;

        let scrollY = 0;
        let currentScroll = 0;
        const ease = 0.03; // Lower friction for "slower stop" (more momentum)

        // Optimized setter
        const setY = gsap.quickSetter(content, "y", "px");

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

            // Sync Translation using quickSetter
            if (content) {
                setY(-currentScroll);
                // force3D is implied with quickSetter on transform properties usually, 
                // but let's stick to this simple optimized setter.
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
    }, [isMobile]);

    return { wrapperRef, contentRef };
};

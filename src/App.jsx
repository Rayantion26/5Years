import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Background from './components/Background';
import Orbs from './components/Orbs';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import ExecuteButton from './components/ExecuteButton';
import HUD from './components/HUD';
import SmartHeader from './components/SmartHeader';
import Loader from './components/Loader';


import { useMomentumScroll } from './hooks/useMomentumScroll';
import { useIsMobile } from './hooks/useIsMobile';
import gsap from 'gsap';

const Home = ({ isLoading }) => {
    return (
        <>
            <Hero isLoading={isLoading} />
            <Timeline />
            <ExecuteButton />
            {/* Spacer for scrolling feel */}
            <div className="h-[50vh]"></div>
        </>
    );
};

/* Scroll Wrapper Component */
const ScrollWrapper = ({ children }) => {
    const { contentRef, wrapperRef } = useMomentumScroll();
    const isMobile = useIsMobile();

    // On mobile, we use native scrolling, so we don't need the fixed wrapper hacks
    const wrapperClass = isMobile
        ? "w-full min-h-screen overflow-x-hidden"
        : "fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none";

    const contentClass = isMobile
        ? ""
        : "pointer-events-auto will-change-transform";

    return (
        <div ref={wrapperRef} className={wrapperClass}>
            <div ref={contentRef} className={contentClass}>
                {children}
            </div>
        </div>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        gsap.config({ force3D: true });
        gsap.ticker.lagSmoothing(0); // Prevents jumps when tab is inactive or heavy load
    }, []);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            // Refresh ScrollTrigger and Recalculate Body Height after loader exits
            setTimeout(() => {
                // 1. Force recalculate of momentum scroll height
                window.dispatchEvent(new Event('resize'));

                // 2. Refresh ScrollTrigger
                const ScrollTrigger = gsap.utils.checkPrefix("ScrollTrigger") || window.ScrollTrigger;
                if (ScrollTrigger) ScrollTrigger.refresh();
                if (gsap.plugins.scrollTrigger) gsap.plugins.scrollTrigger.refresh();

                // Forcing a global refresh safely
                gsap.globalTimeline.pause().resume();

                // Specific ScrollTrigger refresh via main gsap object if registered
                if (gsap.ScrollTrigger) gsap.ScrollTrigger.refresh();
            }, 100);
        }
    }, [isLoading]);

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <div className="min-h-screen bg-black text-white font-display relative selection:bg-neon-cyan selection:text-black select-none">
                {/* Loader Overlay */}
                {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

                <Background />
                <Orbs />
                <SmartHeader />
                <HUD />

                <ScrollWrapper>
                    <Routes>
                        <Route path="/" element={<Home isLoading={isLoading} />} />
                    </Routes>
                </ScrollWrapper>
            </div>
        </Router>
    );
}

export default App;

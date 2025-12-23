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
import AboutMe from './pages/AboutMe';
import { useMomentumScroll } from './hooks/useMomentumScroll';
import gsap from 'gsap';

const Home = () => {
    return (
        <>
            <Hero />
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
    return (
        <div ref={wrapperRef} className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div ref={contentRef} className="pointer-events-auto will-change-transform">
                {children}
            </div>
        </div>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        gsap.config({ force3D: true });
    }, []);

    useEffect(() => {
        if (!isLoading) {
            // Refresh ScrollTrigger after loader exits to ensure positions are correct
            setTimeout(() => {
                const ScrollTrigger = gsap.utils.checkPrefix("ScrollTrigger") || window.ScrollTrigger;
                if (ScrollTrigger) ScrollTrigger.refresh();
                // If using the plugin directly
                if (gsap.plugins.scrollTrigger) gsap.plugins.scrollTrigger.refresh();

                // Forcing a global refresh safely
                gsap.globalTimeline.pause().resume(); // Sometimes helps wake up things

                // Specific ScrollTrigger refresh via main gsap object if registered
                if (gsap.ScrollTrigger) gsap.ScrollTrigger.refresh();
            }, 100);
        }
    }, [isLoading]);

    return (
        <Router>
            <div className="min-h-screen bg-black text-white font-display relative selection:bg-neon-cyan selection:text-black select-none">
                {/* Loader Overlay */}
                {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

                <Background />
                <Orbs />
                <SmartHeader />
                <HUD />

                <ScrollWrapper>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/AboutMe" element={<AboutMe />} />
                    </Routes>
                </ScrollWrapper>
            </div>
        </Router>
    );
}

export default App;

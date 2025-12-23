import React from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const ExecuteButton = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        // Prevent multiple clicks
        if (e.currentTarget.classList.contains('active')) return;
        e.currentTarget.classList.add('active');

        // Button Click Feedback
        gsap.to(e.currentTarget, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Create Transition Overlay
        const overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#000000'; // Pitch black
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none'; // Allow click through until fully visible? No, block.
        overlay.style.pointerEvents = 'all';
        document.body.appendChild(overlay);

        // Animate Overlay & Navigate
        gsap.to(overlay, {
            opacity: 1,
            duration: 1, // Smooth fade to black
            ease: "power2.inOut",
            onComplete: () => {
                // Navigate to external/sibling project
                window.location.href = '/AboutMe/';
            }
        });
    };

    return (
        <div className="py-20 flex justify-center w-full z-30 relative">
            <button
                onClick={handleClick}
                className="
          group relative px-12 py-4 bg-transparent border border-neon-cyan/50 text-neon-cyan
          font-mono text-xl tracking-[0.2em] overflow-hidden transition-all duration-300
          hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]
          active:scale-95
        "
            >
                <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">[ EXECUTE_LOG: /AboutMe/ ]</span>
            </button>
        </div>
    );
};

export default ExecuteButton;

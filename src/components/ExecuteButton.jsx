import React from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const ExecuteButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Warp Jump Transition Effect
        const tl = gsap.timeline();

        tl.to("body", {
            scale: 5,
            opacity: 0,
            duration: 1.5,
            ease: "power4.in",
            onComplete: () => {
                navigate('/AboutMe');
                // Reset styles for next page (slightly hacky but works for effect)
                gsap.set("body", { scale: 1, opacity: 1 });
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
        "
            >
                <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">[ EXECUTE_LOG: /AboutMe/ ]</span>
            </button>
        </div>
    );
};

export default ExecuteButton;

import React, { useEffect, useState } from 'react';

const HUD = () => {
    const [latency, setLatency] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * 5) + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-8 left-8 z-50 font-mono text-[10px] text-white/40 pointer-events-none select-none">
            <div className="grid grid-cols-1 gap-1">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span>STATUS: VIBE_CODING_ACTIVE</span>
                </div>
                <div>GRAVITY: 0.0g</div>
                <div>LATENCY: {latency}ms</div>
                <div>OUTPUT: 10-bit_HDR</div>
            </div>

            {/* Corner accents */}
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-white/20"></div>
        </div>
    );
};

export default HUD;

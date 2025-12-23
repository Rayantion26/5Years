import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const usePhysics = (options = {}) => {
    const {
        gravity = 0,
        friction = 0.05,
        repulsionRadius = 200,
        repulsionStrength = 0.5
    } = options;

    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const applyForce = (element, x, y, baseX, baseY) => {
        // Calculate distance to mouse
        const dx = x - mouseRef.current.x;
        const dy = y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let forceX = 0;
        let forceY = 0;

        // Mouse Repulsion
        if (distance < repulsionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - distance) / repulsionRadius;
            forceX += Math.cos(angle) * force * repulsionStrength * 100;
            forceY += Math.sin(angle) * force * repulsionStrength * 100;
        }

        // Return to base (Spring)
        const springX = (baseX - x) * friction;
        const springY = (baseY - y) * friction;

        return {
            x: x + forceX + springX,
            y: y + forceY + springY
        };
    };

    return { mouseRef, applyForce };
};

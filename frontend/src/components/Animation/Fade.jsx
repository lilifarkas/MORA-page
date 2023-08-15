import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const FadeIn = ({ children }) => {
    const fadeRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const fadeInAnimation = useSpring({
        from: { opacity: 0, transform: 'translateX(-100px)' },
        to: { opacity: isAnimating ? 1 : 0, transform: isAnimating ? 'translateY(0)' : 'translateY(-100px)' },
        config: { duration: 1000 },
    });

    useEffect(() => {
        const handleScroll = () => {
            if (fadeRef.current) {
                const rect = fadeRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                const triggerPoint = windowHeight - 100;

                if (rect.top <= triggerPoint && !isAnimating) {
                    setIsAnimating(true);
                } else if (rect.top > triggerPoint && isAnimating) {
                    setIsAnimating(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAnimating]);

    return (
        <animated.div ref={fadeRef} className="fade-in" style={fadeInAnimation}>
            {children}
        </animated.div>
    );
};

export default FadeIn;
import React, {useEffect, useRef, useState} from "react";
import {animated, useSpring} from "react-spring";

const FadeIn = ({ children }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const fadeAnimation = useSpring({
        opacity: isVisible ? 1 : 0,
        from: { opacity: 0 },
        config: {
            duration: 1000,
        },
    });

    return (
        <animated.div ref={ref} style={fadeAnimation}>
            {children}
        </animated.div>
    );
};

export default FadeIn;
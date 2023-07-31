import React, {useEffect, useRef, useState} from "react";
import {a, useTrail} from "@react-spring/web";
import styles from "./styles.module.css";

const Trail = ({ open, children }) => {
    const items = React.Children.toArray(children);
    const trailRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const trail = useTrail(items.length, {
        config: { mass: 10, tension: 400, friction: 40 },
        opacity: isVisible && open ? 1 : 0, // Use isVisible in the animation
        x: isVisible && open ? 0 : 20,
        height: isVisible && open ? 110 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    });

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

        if (trailRef.current) {
            observer.observe(trailRef.current);
        }

        return () => {
            if (trailRef.current) {
                observer.unobserve(trailRef.current);
            }
        };
    }, []);

    return (
        <div ref={trailRef}>
            {trail.map(({ height, ...style }, index) => (
                <a.div key={index} className={styles.trailsText} style={style}>
                    <a.div style={{ height }}>{items[index]}</a.div>
                </a.div>
            ))}
        </div>
    );
};

export default Trail;
import React from 'react';
import { useSpring, animated } from 'react-spring';

const ButtonAnimation = ({ children }) => {
    const [hovered, setHovered] = React.useState(false);

    const buttonAnimation = useSpring({
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        config: { tension: 500, friction: 30 },
    });

    return (
        <animated.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={buttonAnimation}
        >
            {children}
        </animated.div>
    );
};

export default ButtonAnimation;
import React, { useState } from 'react'
import { a, useSpring } from 'react-spring'
import './Slider.css'
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";

export default function Carousel({ items, itemWidth = 'full', style, children }) {
    const windowWidth = itemWidth === 'full' ? window.innerWidth : itemWidth;
    const width = itemWidth === 'full' ? windowWidth : itemWidth;

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div style={{ ...style }} className="slider-container">
            {items.map((item, i) => (
                <a.div
                    key={i}
                    style={{
                        width,
                        transform: `translateX(${(i - activeIndex) * width}px)`,
                        transition: 'transform 0.5s ease-in-out'
                    }}
                    className="slider-item"
                >
                    {/*<div className="carousel-message">{item.message}</div>*/}
                    {children(item, i)}
                </a.div>
            ))}
            {/*<InstaCounter currentIndex={activeIndex} data={items}/>*/}
            <div style={{}} className="slider-navigation">
                <button className="arrow-button logout" onClick={handlePrev}>
                    <FiArrowLeft />
                </button>
                <button className="arrow-button logout" onClick={handleNext}>
                    <FiArrowRight />
                </button>
            </div>
        </div>
    );
}

function InstaCounter({ currentIndex, data }) {
    const dots = [];

    for (const [index] of data.entries()) {
        dots.push(<Dot key={index} active={currentIndex - 1 === index} />);
    }

    return (
        <div className="slider-navigation">
            <div className="slider-dotcontainer">{dots}</div>
        </div>
    );
}

function Dot({ active }) {
    const { transform, opacity } = useSpring({
        opacity: active ? 1 : 0.8,
        transform: active ? `scale(1.5)` : `scale(1)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return <a.div className="slider-dot" style={{ opacity: opacity.interpolate(o => o), transform }} />;
}

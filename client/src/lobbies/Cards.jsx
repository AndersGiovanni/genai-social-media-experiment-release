import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const CardWrapper = styled.div`
  width: clamp(12.9vw, 61vh, 18vw);
  height: clamp(18vw, 85vh, 25.2vw);
  position: relative;
  overflow: hidden;
  margin: 20px;
  z-index: 10;
  touch-action: none;
  border-radius: 5% / 3.5%;
  background-color: #040712;
  background-image: ${props => `url(${props.imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  transform-origin: center;
  transition: 
    transform 0.1s ease-out,
    box-shadow 0.2s ease-out,
    background-position 0.1s ease-out;
  will-change: transform, filter;
  perspective: 1500px;
  transform-style: preserve-3d;

  box-shadow: 
    -5px -5px 5px -5px ${props => props.color1}, 
    5px 5px 5px -5px ${props => props.color2}, 
    -7px -7px 10px -5px transparent, 
    7px 7px 10px -5px transparent, 
    0 0 5px 0px rgba(255,255,255,0),
    0 55px 35px -20px rgba(0, 0, 0, 0.5);

  &:hover {
    transform-style: preserve-3d;
    transform-origin: center;
    box-shadow: 
      -20px -20px 30px -25px ${props => props.color1}, 
      20px 20px 30px -25px ${props => props.color2}, 
      -7px -7px 10px -5px ${props => props.color1}, 
      7px 7px 10px -5px ${props => props.color2}, 
      0 0 13px 4px rgba(255,255,255,0.3),
      0 55px 35px -20px rgba(0, 0, 0, 0.5);
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
    opacity: .5;
    mix-blend-mode: color-dodge;
    transition: all 0.1s ease-out;
  }

  &:before {
    background-position: 50% 50%;
    background-size: 300% 300%;
    background-image: linear-gradient(
      115deg,
      transparent 0%,
      ${props => props.color1} 25%,
      transparent 47%,
      transparent 53%,
      ${props => props.color2} 75%,
      transparent 100%
    );
    opacity: .5;
    filter: brightness(.5) contrast(1);
    z-index: 1;
  }

  &:after {
    opacity: 1;
    background-image: url("https://assets.codepen.io/13471/sparkles.gif"), 
      url(https://assets.codepen.io/13471/holo.png), 
      linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
    background-position: 50% 50%;
    background-size: 160%;
    background-blend-mode: overlay;
    z-index: 2;
    filter: brightness(1) contrast(1);
    transition: all 0.1s ease-out;
    mix-blend-mode: color-dodge;
    opacity: .75;
  }

  &.animated {
    animation: holoCard 12s ease 0s infinite;
    
    &:before {
      animation: holoGradient 12s ease 0s infinite;
    }
    
    &:after {
      animation: holoSparkle 12s ease 0s infinite;
    }
  }
`;

const holoCardAnimation = keyframes`
  0%, 100% {
    transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
  }
  5%, 8% {
    transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
  }
  13%, 16% {
    transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
  }
  35%, 38% {
    transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
  }
  55% {
    transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
  }
`;

const holoGradientAnimation = keyframes`
  0%, 100% {
    opacity: 0.5;
    background-position: 50% 50%;
    filter: brightness(.5) contrast(1);
  }
  5%, 9% {
    background-position: 100% 100%;
    opacity: 1;
    filter: brightness(.75) contrast(1.25);
  }
  13%, 17% {
    background-position: 0% 0%;
    opacity: .88;
  }
  35%, 39% {
    background-position: 100% 100%;
    opacity: 1;
    filter: brightness(.5) contrast(1);
  }
  55% {
    background-position: 0% 0%;
    opacity: 1;
    filter: brightness(.75) contrast(1.25);
  }
`;

const holoSparkleAnimation = keyframes`
  0%, 100% {
    opacity: .75; 
    background-position: 50% 50%; 
    filter: brightness(1.2) contrast(1.25);
  }
  5%, 8% {
    opacity: 1; 
    background-position: 40% 40%; 
    filter: brightness(.8) contrast(1.2);
  }
  13%, 16% {
    opacity: .5; 
    background-position: 50% 50%; 
    filter: brightness(1.2) contrast(.8);
  }
  35%, 38% {
    opacity: 1; 
    background-position: 60% 60%; 
    filter: brightness(1) contrast(1);
  }
  55% {
    opacity: .33; 
    background-position: 45% 45%; 
    filter: brightness(1.2) contrast(1.25);
  }
`;

export const HoloCard = ({ imageUrl, color1 = '#fac', color2 = '#ddccaa', animated = false }) => {
    const cardRef = useRef(null);
    const styleRef = useRef(null);
    let timeout = null;

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();

        const l = e.clientX - rect.left;
        const t = e.clientY - rect.top;

        const h = card.offsetHeight;
        const w = card.offsetWidth;

        const px = Math.abs(Math.floor(100 / w * l) - 100);
        const py = Math.abs(Math.floor(100 / h * t) - 100);
        const pa = (50 - px) + (50 - py);

        const lp = (50 + (px - 50) / 1.5);
        const tp = (50 + (py - 50) / 1.5);
        const px_spark = (50 + (px - 50) / 7);
        const py_spark = (50 + (py - 50) / 7);
        const p_opc = 20 + (Math.abs(pa) * 1.5);
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * .5;

        card.style.transform = `perspective(1500px) rotateX(${ty}deg) rotateY(${tx}deg)`;

        const style = `
            .card:hover:before { 
                background-position: ${lp}% ${tp}%; 
            }
            .card:hover:after { 
                background-position: ${px_spark}% ${py_spark}%; 
                opacity: ${p_opc / 100}; 
            }
        `;

        if (styleRef.current) {
            styleRef.current.innerHTML = style;
        }
    };

    const handleMouseOut = () => {
        const card = cardRef.current;
        if (!card) return;

        if (styleRef.current) {
            styleRef.current.innerHTML = '';
        }
        card.style.transform = '';

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            card.classList.add('animated');
        }, 2500);
    };

    useEffect(() => {
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, []);

    return (
        <>
            <style ref={styleRef} />
            <CardWrapper
                ref={cardRef}
                className={`card ${animated ? 'animated' : ''}`}
                imageUrl={imageUrl}
                color1={color1}
                color2={color2}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseOut}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseOut}
            />
        </>
    );
};

export default HoloCard;
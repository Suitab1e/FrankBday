import React, { useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';
import SpinningPhoto from './SpinningPhoto';

// Import assets
import frank1 from '../assets/frank1.png';
import frank2 from '../assets/frank2.png';
import frank3 from '../assets/frank3.png';
import frank4 from '../assets/frank4.png';
import frank5 from '../assets/frank5.png';

const PEPE_GIF_URL = "https://media.giphy.com/media/oBQZIgNobc7ewVWvCd/giphy.gif";

const HeroContainer = styled(motion.div)`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
  padding: 0 1rem;
  z-index: 10;
`;

const EnterButton = styled(motion.button)`
  font-size: clamp(1.2rem, 4vw, 2rem);
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  background: var(--primary-gradient);
  color: white;
  cursor: pointer;
  z-index: 10;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const MusicToggle = styled(motion.button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 100;
`;

const PepeCorner = styled.img`
  position: fixed;
  width: 80px;
  height: 80px;
  object-fit: contain;
  z-index: 5;
  
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }

  &.top-left {
    top: 1rem;
    left: 1rem;
  }

  &.top-right {
    top: 1rem;
    right: 1rem;
  }

  &.bottom-left {
    bottom: 1rem;
    left: 1rem;
  }

  &.bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
`;

const photoPositions = [
  { top: '20%', left: '10%' },
  { top: '70%', right: '10%' },
  { top: '40%', left: '5%' },
  { top: '30%', right: '5%' },
  { top: '60%', left: '15%' }
];

const Hero = ({ onEnterClick, isMusicPlaying, onMusicToggle }) => {
  const { width, height } = useWindowSize();
  const [isConfettiActive, setConfettiActive] = useState(true);

  return (
    <HeroContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Confetti
        width={width}
        height={height}
        numberOfPieces={100}
        recycle={isConfettiActive}
      />
      
      <MusicToggle
        onClick={onMusicToggle}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMusicPlaying ? '🔊' : '🔈'}
      </MusicToggle>

      {/* Pepe corners */}
      <PepeCorner src={PEPE_GIF_URL} alt="Pepe" className="top-left" />
      <PepeCorner src={PEPE_GIF_URL} alt="Pepe" className="top-right" />
      <PepeCorner src={PEPE_GIF_URL} alt="Pepe" className="bottom-left" />
      <PepeCorner src={PEPE_GIF_URL} alt="Pepe" className="bottom-right" />

      {/* Frank photos */}
      <SpinningPhoto src={frank1} style={photoPositions[0]} />
      <SpinningPhoto src={frank2} style={photoPositions[1]} />
      <SpinningPhoto src={frank3} style={photoPositions[2]} />
      <SpinningPhoto src={frank4} style={photoPositions[3]} />
      <SpinningPhoto src={frank5} style={photoPositions[4]} />
      
      <Title
        className="rainbow-text"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        HAPPY BIRTHDAY FRANK
      </Title>

      <EnterButton
        onClick={onEnterClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="wiggle"
      >
        Enter if you dare!
      </EnterButton>
    </HeroContainer>
  );
};

export default Hero; 
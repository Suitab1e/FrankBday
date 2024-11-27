import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import SpinningPhoto from './SpinningPhoto';
import frank4 from '../assets/frank4.png';
import frank5 from '../assets/frank5.png';
import frank6 from '../assets/frank6.png';
import frank7 from '../assets/frank7.png';
import frank8 from '../assets/frank8.png';
import frankvid1 from '../assets/frankvid1.mov';
import frankvid2 from '../assets/frankvid2.mov';

const Container = styled(motion.div)`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(45deg, rgba(26, 15, 60, 0.7), rgba(75, 18, 72, 0.7));
  position: relative;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Challenge = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 90vw;
  width: 320px;
  color: white;
  text-align: center;
  box-shadow: 0 0 20px rgba(255,255,255,0.2);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    margin-bottom: 1.5rem;
    opacity: 0.9;
    line-height: 1.4;
    font-size: 1.1rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

const BananaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const Banana = styled(motion.button)`
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  transition: transform 0.3s ease;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0.8rem;
  color: white;
  text-align: center;
  width: 100%;
  margin: 1rem 0;
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const BackpackReveal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  max-width: 90vw;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: white;
  }
`;

const BackpackOption = styled(motion.button)`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  width: 280px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const MovingBackpack = styled(motion.div)`
  position: absolute;
  font-size: 4rem;
  cursor: pointer;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
  z-index: 10;
`;

const ClickArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

const ClickCounter = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 0 10px rgba(0,0,0,0.5);
  z-index: 10;
`;

const BackgroundMedia = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }

  &.top-right {
    clip-path: polygon(60% 0, 100% 0, 100% 40%, 80% 60%);
  }

  &.bottom-left {
    clip-path: polygon(0 60%, 40% 40%, 20% 100%, 0 100%);
  }
`;

const FullBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
  }
`;

const VideoReveal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const GiftReveal = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  color: white;
  max-width: 90vw;
  width: 320px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .amount {
    font-size: 2.5rem;
    font-weight: bold;
    color: gold;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    margin: 1rem 0;
  }
`;

const backpackOptions = [
  {
    title: '🎒 The Legendary Backpack of Swag',
    description: 'Contains infinite drip and automatic homework completion powers',
  },
  {
    title: '🎒 The Mystical Pack of Memes',
    description: 'Grants the ability to summon rare Pepes at will',
  },
  {
    title: '🎒 The Epic Gamer Bag',
    description: 'Comes with built-in RGB and +100 to all stats',
  }
];

const challenges = [
  {
    type: 'banana',
    title: 'Click the Correct Dancing Banana',
    description: 'One of these bananas is feeling extra groovy...',
  },
  {
    type: 'type',
    title: 'The Magic Word',
    description: 'Type "FRANK" backwards! (Legend says if you say it out loud 3 times, Frank will appear behind you 👻)',
    answer: 'knarf',
  },
  {
    type: 'catch',
    title: 'Catch the Backpack',
    description: 'Quick! Catch that sneaky backpack before it escapes!',
  }
];

const TreasureHunt = ({ onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [backpackPosition, setBackpackPosition] = useState({ x: 50, y: 50 });
  const [showBackpacks, setShowBackpacks] = useState(false);
  const [typingInput, setTypingInput] = useState('');
  const [correctBanana] = useState(Math.floor(Math.random() * 9));
  const [screenClicks, setScreenClicks] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  const [remainingOptions, setRemainingOptions] = useState(backpackOptions);

  useEffect(() => {
    if (challenges[currentChallenge]?.type === 'catch') {
      const interval = setInterval(() => {
        setBackpackPosition({
          x: Math.random() * 80,
          y: Math.random() * 80,
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [currentChallenge]);

  const handleScreenClick = () => {
    if (challenges[currentChallenge]?.type === 'catch') {
      setScreenClicks(prev => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          setShowBackpacks(true);
        }
        return newCount;
      });
    }
  };

  const handleBananaClick = (index) => {
    if (index === correctBanana) {
      setCurrentChallenge(prev => prev + 1);
    }
  };

  const handleTyping = (e) => {
    const value = e.target.value.toLowerCase();
    setTypingInput(value);
    if (value === challenges[1].answer) {
      setCurrentChallenge(prev => prev + 1);
    }
  };

  const handleVideoEnd = () => {
    if (revealStep === 1) {
      // After first video, show remaining two options
      setRemainingOptions(prev => prev.slice(1));
      setRevealStep(2);
    } else if (revealStep === 3) {
      // After second video, show final option
      setRemainingOptions(prev => prev.slice(1));
      setRevealStep(4);
    }
  };

  const handleBackpackChoice = () => {
    if (revealStep === 0) {
      // Show first video
      setRevealStep(1);
    } else if (revealStep === 2) {
      // Show second video
      setRevealStep(3);
    } else if (revealStep === 4) {
      // Show final gift card reveal
      setRevealStep(5);
    } else if (revealStep === 5) {
      // Complete the treasure hunt
      onComplete();
    }
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!showBackpacks && (
        <FullBackground
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={frank4} alt="Frank" />
        </FullBackground>
      )}

      <AnimatePresence mode="wait">
        {!showBackpacks ? (
          <Challenge
            key={currentChallenge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2>{challenges[currentChallenge].title}</h2>
            <p>{challenges[currentChallenge].description}</p>

            {challenges[currentChallenge].type === 'banana' && (
              <BananaContainer>
                {Array(9).fill('🍌').map((banana, i) => (
                  <Banana
                    key={i}
                    onClick={() => handleBananaClick(i)}
                    animate={i === correctBanana ? {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {banana}
                  </Banana>
                ))}
              </BananaContainer>
            )}

            {challenges[currentChallenge].type === 'type' && (
              <Input
                type="text"
                value={typingInput}
                onChange={handleTyping}
                placeholder="Type here..."
                autoFocus
              />
            )}

            {challenges[currentChallenge].type === 'catch' && (
              <>
                <ClickArea onClick={handleScreenClick} />
                <MovingBackpack
                  style={{
                    left: `${backpackPosition.x}%`,
                    top: `${backpackPosition.y}%`
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  🎒
                </MovingBackpack>
              </>
            )}
          </Challenge>
        ) : (
          <>
            {revealStep === 1 && (
              <VideoReveal
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <video 
                  src={frankvid1} 
                  autoPlay 
                  playsInline 
                  onEnded={handleVideoEnd}
                  style={{ maxWidth: '100%', maxHeight: '100vh' }}
                />
              </VideoReveal>
            )}

            {revealStep === 3 && (
              <VideoReveal
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <video 
                  src={frankvid2} 
                  autoPlay 
                  playsInline 
                  onEnded={handleVideoEnd}
                  style={{ maxWidth: '100%', maxHeight: '100vh' }}
                />
              </VideoReveal>
            )}

            {(revealStep === 0 || revealStep === 2 || revealStep === 4) && (
              <BackpackReveal
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <h2 className="rainbow-text">Choose Your Destiny!</h2>
                {remainingOptions.map((option, index) => (
                  <BackpackOption
                    key={index}
                    onClick={handleBackpackChoice}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </BackpackOption>
                ))}
              </BackpackReveal>
            )}

            {revealStep === 5 && (
              <GiftReveal
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <h2>🎉 SURPRISE! 🎉</h2>
                <p>Your friends have all chipped in to get you something special...</p>
                <div className="amount">£140</div>
                <p>Gift Card for the backpack of your choice!</p>
                <BackpackOption
                  onClick={handleBackpackChoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Thank you! 🙏
                </BackpackOption>
              </GiftReveal>
            )}
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default TreasureHunt; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SpinningPhoto from './SpinningPhoto';

// Import Frank's photos
import frank1 from '../assets/frank1.png';
import frank2 from '../assets/frank2.png';
import frank3 from '../assets/frank3.png';
import frank5 from '../assets/frank5.png';
import frank6 from '../assets/frank6.png';

const MessagesContainer = styled(motion.div)`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(45deg, rgba(0, 0, 70, 0.7), rgba(28, 181, 224, 0.7));
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

// Photo positions for floating circles
const photoPositions = [
  { top: '10%', left: '10%' },
  { top: '70%', right: '15%' },
  { top: '30%', right: '5%' },
  { top: '60%', left: '5%' },
  { top: '20%', right: '20%' }
];

const WindowsMessage = styled(motion.div)`
  background: rgba(236, 233, 216, 0.9);
  border: 3px solid #0055EA;
  border-radius: 8px;
  padding: 1rem;
  max-width: 90vw;
  width: 320px;
  color: #000;
  box-shadow: 0 0 20px rgba(255,255,255,0.3);
  position: relative;
  margin: 1rem;
  z-index: 10;
  backdrop-filter: blur(5px);

  .title-bar {
    background: linear-gradient(180deg, #0058E6 0%, #3A93FF 50%, #0058E6 100%);
    color: white;
    padding: 0.5rem;
    margin: -1rem -1rem 1rem -1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;

    img {
      width: 20px;
      height: 20px;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const XPButton = styled.button`
  background: linear-gradient(180deg, #F0F0EA 0%, #E1E1D9 50%, #CECEBD 100%);
  border: 2px solid #003DD9;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  min-width: 80px;

  &:active {
    background: linear-gradient(180deg, #CECEBD 0%, #E1E1D9 50%, #F0F0EA 100%);
  }
`;

const messages = [
  {
    title: "System Message",
    content: "FrOnk detected! Initializing birthday protocol...",
    icon: "⚠️"
  },
  {
    title: "Naylor.smsh",
    content: "Happy birthday d00fus, hope you like this bday e-website. keep it lemon",
    icon: "🎮"
  },
  {
    title: "Jack.fat",
    content: "Hi Frank, Hope you have a great 28th. Your mum (129) and dad (297) would be so proud. Love",
    icon: "🥩"
  },
  {
    title: "StarkieReay.pdf",
    content: "lots of love from **** x miss you",
    icon: "💀"
  },
  {
    title: "Jessica.gif",
    content: "Happy birthday Fronkus! Hope your massive head is filled to the brim with beautiful memories this weekend. Love you xxx",
    icon: "🫃🏻"
  },
  {
    title: "Basty.sxc",
    content: "Frankieeeee, happy birthday you neek :) hope you play some guy-ball and smoke a fatty. One love",
    icon: "🎉"
  },  
  {
    title: "Treasure.exe",
    content: "A wild backpack has appeared! Time for a treasure hunt...",
    icon: "🎒"
  }
];

const Messages = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [nyanCats, setNyanCats] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  
  const handleNextMessage = () => {
    if (currentMessage === messages.length - 1) {
      onComplete();
      return;
    }

    setCurrentMessage(prev => prev + 1);
    setClickCount(prev => prev + 1);
    
    // Easter egg: Spawn Nyan cats after rapid clicking
    if (clickCount > 5) {
      const newCat = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      };
      setNyanCats(prev => [...prev, newCat]);
      setTimeout(() => {
        setNyanCats(prev => prev.filter(cat => cat.id !== newCat.id));
      }, 3000);
    }
  };

  return (
    <MessagesContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Floating Frank photos */}
      <SpinningPhoto src={frank1} style={photoPositions[0]} />
      <SpinningPhoto src={frank2} style={photoPositions[1]} />
      <SpinningPhoto src={frank3} style={photoPositions[2]} />
      <SpinningPhoto src={frank5} style={photoPositions[3]} />
      <SpinningPhoto src={frank6} style={photoPositions[4]} />

      {nyanCats.map(cat => (
        <motion.img
          key={cat.id}
          src="https://media.giphy.com/media/7lsw8RenVcjCM/giphy.gif"
          style={{
            position: 'fixed',
            left: `${cat.x}vw`,
            top: `${cat.y}vh`,
            width: '100px',
            zIndex: 1000
          }}
          initial={{ x: -100 }}
          animate={{ x: window.innerWidth + 100 }}
          transition={{ duration: 2, ease: "linear" }}
        />
      ))}

      <WindowsMessage
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        <div className="title-bar">
          <span>{messages[currentMessage].icon}</span>
          <span>{messages[currentMessage].title}</span>
        </div>
        <p>{messages[currentMessage].content}</p>
        <div className="buttons">
          <XPButton onClick={handleNextMessage}>
            {currentMessage === messages.length - 1 ? "Start Hunt" : "OK"}
          </XPButton>
          <XPButton onClick={handleNextMessage}>
            {currentMessage === messages.length - 1 ? "Let's Go!" : "Cancel"}
          </XPButton>
        </div>
      </WindowsMessage>
    </MessagesContainer>
  );
};

export default Messages; 
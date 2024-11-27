import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Messages from './components/Messages';
import TreasureHunt from './components/TreasureHunt';
import GlobalStyles from './styles/GlobalStyles';
import backgroundMusic from './assets/background music.mp3';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [partyMode, setPartyMode] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSoundInitialized, setIsSoundInitialized] = useState(false);
  const audioRef = useRef(new Audio(backgroundMusic));

  // Set up audio when component mounts
  useEffect(() => {
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  // Handle music playing state
  useEffect(() => {
    if (isMusicPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Playback failed:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  const initializeSound = async () => {
    const wantSound = window.confirm(
      '🔊 IMPORTANT: For the best birthday experience:\n\n' +
      '1. Turn OFF your phone\'s silent/mute switch\n' +
      '2. Turn your volume UP\n' +
      '3. Get ready to party!\n\n' +
      'Tap OK to start the music!'
    );

    if (!wantSound) {
      setIsSoundInitialized(true);
      return false;
    }

    try {
      // Create and start AudioContext
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      await audioContext.resume();

      // Try to play a silent buffer to unlock audio
      const buffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      source.stop(0.001);

      setIsSoundInitialized(true);
      setIsMusicPlaying(true);

      // Try to play multiple times to ensure it starts
      const playAttempt = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log('Play attempt failed, retrying...');
        }
      };

      playAttempt();
      setTimeout(playAttempt, 500);
      setTimeout(playAttempt, 1000);

      return true;
    } catch (error) {
      console.log('Sound init error:', error);
      setIsSoundInitialized(true);
      setIsMusicPlaying(true);
      return true;
    }
  };

  const handleEnterClick = async () => {
    if (!isSoundInitialized) {
      await initializeSound();
    }
    // Always proceed to messages section
    setCurrentSection('messages');
  };

  const toggleMusic = () => {
    if (!isSoundInitialized) {
      initializeSound();
    } else {
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {currentSection === 'hero' && (
          <Hero 
            key="hero" 
            onEnterClick={handleEnterClick} 
            partyMode={partyMode}
            isMusicPlaying={isMusicPlaying}
            onMusicToggle={toggleMusic}
          />
        )}
        {currentSection === 'messages' && (
          <Messages 
            key="messages" 
            onComplete={() => setCurrentSection('treasureHunt')} 
            partyMode={partyMode}
            isMusicPlaying={isMusicPlaying}
            onMusicToggle={toggleMusic}
          />
        )}
        {currentSection === 'treasureHunt' && (
          <TreasureHunt 
            key="treasureHunt" 
            onComplete={() => {
              audioRef.current.pause();
              window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            }}
            partyMode={partyMode}
            isMusicPlaying={isMusicPlaying}
            onMusicToggle={toggleMusic}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

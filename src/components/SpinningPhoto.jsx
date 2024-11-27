import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PhotoContainer = styled(motion.div)`
  width: 120px;
  height: 120px;
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(255,255,255,0.3);
  z-index: 5;
  
  @media (min-width: 768px) {
    width: 180px;
    height: 180px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Deal with it sunglasses easter egg */
  .sunglasses {
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 60px;
    transition: top 0.5s cubic-bezier(.87,-.41,.19,1.44);
  }

  &:hover .sunglasses {
    top: 25%;
  }
`;

const SpinningPhoto = ({ src, style }) => {
  return (
    <PhotoContainer
      style={style}
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="rgb-border"
    >
      <img src={src} alt="Frank" />
      <div className="sunglasses">🕶️</div>
    </PhotoContainer>
  );
};

export default SpinningPhoto; 
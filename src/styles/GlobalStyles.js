import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap');

  :root {
    --primary-gradient: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    --primary-font: 'Fredoka', "Comic Sans MS", sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: var(--primary-font);
    font-weight: 400;
    background: #000;
    color: #fff;
    overflow-x: hidden;
    overscroll-behavior: none;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
    letter-spacing: 0.5px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--primary-font);
    font-weight: 600;
    letter-spacing: 1px;
  }

  button {
    font-family: var(--primary-font);
    font-weight: 600;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
    letter-spacing: 0.5px;
  }

  input {
    font-family: var(--primary-font);
    font-weight: 400;
    letter-spacing: 0.5px;
  }

  img {
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
  }

  .rgb-border {
    animation: rgb-border 2s linear infinite;
  }

  @keyframes rgb-border {
    0% { border-color: red; }
    33% { border-color: lime; }
    66% { border-color: blue; }
    100% { border-color: red; }
  }

  .rainbow-text {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow-move 5s linear infinite;
    background-size: 200% 200%;
    font-weight: 600;
  }

  @keyframes rainbow-move {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .wiggle {
    animation: wiggle 0.5s ease-in-out infinite;
  }

  @keyframes wiggle {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
  }

  /* Mobile optimization */
  @media (max-width: 768px) {
    .rainbow-text {
      background-size: 400% 400%;
    }

    .wiggle {
      animation-duration: 0.3s;
    }
  }
`;

export default GlobalStyles; 
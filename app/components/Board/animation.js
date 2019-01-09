import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, -30px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

export const fadeInCard = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 300px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

export const dragOver = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.35;
  }
`;

export const borderDance = keyframes`
0% {
  background-position: 0px 0px, 300px 116px, 0px 150px, 216px 0px;
}
100% {
  background-position: 300px 0px, 0px 116px, 0px 0px, 216px 150px;
}
`;


export const slideInLeft = keyframes`
  0% {
    opacity: 0;
    left: -7vw;
  }
  100% {
    opacity: 1;
    left: 0vw;
  }
`;

export const slideInRight = keyframes`
  0% {
    opacity: 0;
    right: -7vw;
  }
  100% {
    opacity: 1;
    right: 0vw;
  }
`;

export const iconFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1.0);
  }
`;


export const zoomOutText = keyframes`
  0% {
    opacity: 0;
    bottom: 16vh;
    transform: scale(1.5);
  }

  90% {
    bottom: 18.2vh;
  }

  100% {
    opacity: 1;
    bottom: 18vh;
    transform: scale(1.0);
  }
`;

export const zoomOutShare = keyframes`
  0% {
    opacity: 0;
    bottom: 10vh;
    transform: scale(1.5);
  }

  90% {
    bottom: 13vh;
  }

  100% {
    opacity: 1;
    bottom: 12vh;
    transform: scale(1.0);
  }
`;

export const textZoom = keyframes`
  0% {
      transform: scale(1);
  }
  100% {
      transform: scale(1.25);
  }
`;


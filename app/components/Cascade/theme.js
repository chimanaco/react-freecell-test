import styled, { css } from 'styled-components';

import {
  fadeInCard,
  dragOver,
} from '../Board/animation';

export const CardList = styled.div`
  padding: 0;
  position: relative;
  border-radius: 5px;
  border: 1px solid #A2A2A2;
  width: 100px;
  height: 800px;
  background-color: #DDDDDD;
  
  &.active {
    animation: ${dragOver} 0.3s ease-in forwards;
  }
  
  img {
    position: absolute;
    left: 10px;
        
    ${createCSS()};
  }
  
  &.active {
    img {
      pointer-events: none;
    }
  }
`;

function createCSS() {
  let styles = '';

  for (let i = 0; i < 21; i += 1) {
    styles += `
       &.pos${i} {
         top: ${i * 50 + 10}px;
         
         &.isFirst {
           animation: ${fadeInCard} ${0.1 * i}s ease-in;
         }
       }
    `
  }

  return css`${styles}`;
}

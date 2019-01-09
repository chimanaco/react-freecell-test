import styled from 'styled-components';
import {
  dragOver,
} from '../Board/animation';

export const DropArea = styled.div`
  position: relative;
  background-color: #FFFFFF;
  border-radius: 5px;
  border: 1px solid #A2A2A2;
  width: 100px;
  height: 145px;
  text-align: center;
  
  &.active {
    animation: ${dragOver} 0.3s ease-in forwards;
  }
  
  img {
    pointer-events: none;
    margin: 15px auto 0;
  }
`;

export const FoundationBG = styled.div`
  position: absolute;
  width: 100px;
  text-align: center;
  top: 50%;
  transform: translate(0, -50%);
  color: #A2A2A2;
  pointer-events: none;
  
  img {
    pointer-events: none;
    width: 50%;
    height: auto;
  }
  
  &.active {
    img {
      display: none;
    }
  }
`;


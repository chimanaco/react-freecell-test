import styled from 'styled-components';

import { fadeIn, fadeOut, iconFadeIn, slideInLeft, slideInRight, zoomOutText, zoomOutShare, textZoom } from './animation';

export const BG = styled.div`
  background-color: green;
  height: 1200px;
  position: relative;
  padding-top: 20px;
`;

export const CellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px;
  animation: ${fadeIn} 0.3s ease-in;
`;

export const FreeCellArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45%;
`;

export const FoundationArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45%;
`;

export const CascadeColumns = styled.div`
  margin: 50px auto;
  padding: 0;
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 1000px;
`;

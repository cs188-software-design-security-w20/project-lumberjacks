import styled from '@emotion/styled';
import { css } from '@emotion/core';

const black = 'rgba(0, 0,0, 0.8)';
const secondaryBlack = 'rgba(0, 0,0, 0.4)';
const tertiaryBlack = 'rgba(0, 0,0, 0.1)';
const gray = '#F3F3F3';

export const StyledGalleryItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${gray};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 16px;
`;

export const StyledButton = styled.button`
  display: block;
  width: auto;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  border: 0;
  font-size: 16px;
  padding: 0 16px;
  font-style: normal;
  font-weight: normal;
  margin: 0 auto;
  box-sizing: border-box;
  color: white;
  background-color: ${black};
  text-align: center;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const StyledContainer = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 40px 20px;
  height: 100%;
  margin: 0 auto;
`;

const headerTextStyle = css`
  font-style: normal;
  font-weight: normal;
  margin: 0;
  color: ${black};
`;

export const StyledHeaderText = styled.h1`
  ${headerTextStyle}
  font-size: 36px;
  margin-top: 48px;
`;

export const StyledSubheaderText = styled.h2`
  ${headerTextStyle}
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 54px;
`;

export const StyledLabelText = styled.h3`
  ${headerTextStyle}
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
`;

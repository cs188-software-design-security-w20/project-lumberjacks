import styled from '@emotion/styled';
import { css } from '@emotion/core';

const black = 'rgba(0, 0,0, 0.8)';
const secondaryBlack = 'rgba(0, 0,0, 0.4)';
const tertiaryBlack = 'rgba(0, 0,0, 0.1)';
const gray = '#F3F3F3';

const textStyle = css`
  font-family: sans-serif;
  font-weight: normal;
  margin: 0;
  color: ${black};
`;

export const StyledGalleryItem = styled.div`
  position: relative;
  background-color: ${gray};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 16px;
`;

export const StyledButton = styled.button`
  display: block;
  width: auto;
  line-height: 40px;
  border-radius: 4px;
  border: 0;
  font-size: 16px;
  padding: 0 25px 0 25px;
  font-style: normal;
  font-weight: normal;
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
  ${textStyle}
  width: 100%;
  // padding: 40px 20px;
  height: 100%;
  margin: 0 auto;
`;

export const StyledTitleText = styled.h1`
  ${textStyle}
  font-size: 35px;
  margin-bottom: 20px;
`;

// Despite the names, these are just used for the shortcuts
export const StyledHeaderText = styled.h1`
  ${textStyle}
  font-size: 25px;
  margin-bottom: 20px;
`;

export const StyledSubheaderText = styled.h2`
  ${textStyle}
  font-size: 14px;
`;

export const StyledLabelText = styled.h3`
  ${textStyle}
  display: block;
  font-size: 13px;
  margin-bottom: 5px;
`;

export const StyledList = styled.ul`
  ${textStyle}
  display: block;
  padding: 0;
`;

export const StyledListItem = styled.li`
  ${textStyle}
  display: block;
  font-size: 14px;
`;

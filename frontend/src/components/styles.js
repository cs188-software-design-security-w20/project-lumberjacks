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
  line-height: 35px;
  border-radius: 4px;
  border: 0;
  font-size: 16px;
  padding: 0 25px 0 25px;
  font-style: normal;
  font-weight: 600;
  box-sizing: border-box;
  color: ${black};
  background-color: white;
  border: 2px solid ${gray};
  text-align: center;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  width: 100%;
`;

// centered container
export const StyledContainer = styled.div`
  ${textStyle}
  margin: auto;
  width: 35%;
  height: 100%;
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
  font-size: 20px;
  font-weight: bold;
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

export const StyledInput = styled.input`
  background-color: ${gray};
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 5px;
  width: 100%;
  box-shadow: none;
  height: 30px;
  font-size: 1rem;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: inline-block;
`;

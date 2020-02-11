import styled from '@emotion/styled';
import { css } from '@emotion/core';

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

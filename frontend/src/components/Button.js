import React from 'react';
import { StyledButton } from './styles';

const Button = ({ text, onClick, secondary }) => (
  <StyledButton secondary={secondary} onClick={onClick}>
    {text}
  </StyledButton>
);

export default Button;

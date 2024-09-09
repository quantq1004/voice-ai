import styled from 'styled-components';
import { Box, Typography, Avatar, Button } from '@mui/material';

export const StyledBox = styled(Box)`
  padding: 32px;

  &.title {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &.content {
    margin: 16px 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const StyledTypography = styled(Typography)`
  &.title {
    font-family: Lato;
    font-weight: bold;
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 30px;
    line-height: 1.5;
    text-align: center;
  }

  &.content {
    font-family: Lato;
    font-weight: bold;
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 25px;
    line-height: 1.5;
    text-align: center;
  }

  &.describe {
    font-family: Lato;
    font-weight: initial;
    color: black;
    font-size: 20px;
    line-height: 1.5;
    text-align: start;
  }
`;

export const StyledAvatar = styled(Avatar)`
  && {
    margin: 4px;
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

export const StyledButton = styled(Button)`
  &&.customButton {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 32px auto;
    width: 30%;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

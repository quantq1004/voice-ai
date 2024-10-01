import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { MOBILE_BREAKPOINT } from '@src/styles/config';
import { Box, Typography, Avatar, Button, Dialog } from '@mui/material';

export const StyledFirstVoice = styled('div')`
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
    flex-direction: column;
    margin: auto 0;
    gap: 16px;

    .image {
      width: auto;
    }

    .text-empty-list {
      font-size: 12px;
    }

    .button {
      text-transform: none;
      margin-top: 16px;
      gap: 11px;
      border-radius: 100px;
      display: flex;
      justify-content: space-around;
      width: auto;
      height: 72px;
      font-weight: 500;
      line-height: 20px;
      color: ${COLOR.darkBlue};
      font-size: 16px;

      .icon {
        font-size: 40px;
      }
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 85vh;
      flex-direction: column;
      margin: auto 0;
      gap: 16px;

      .image {
        width: 180px;
      }

      .text-empty-list {
        font-size: 12px;
      }

      .button {
        text-transform: none;
        margin-top: 16px;
        gap: 11px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 54px;
        font-weight: 500;
        line-height: 20px;
        color: ${COLOR.darkBlue};
        font-size: 16px;

        .icon {
          font-size: 20px;
        }
      }
    }
  }
`;

export const StyledQRDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 580px;
    border-radius: 24px;
  }

  .box-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${COLOR.white};
  }

  .box-qr-title {
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: space-between;
    align-items: center;
    width: 355px;
    margin: 48px;

    .qr-title {
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      color: ${COLOR.darkBlue};
    }

    .box-qr {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 32px;
      align-items: center;

      .box-qr-beta {
        background-color: ${COLOR.paleBlue};
        border-radius: 100px;
        display: flex;
        padding: 8px 0px;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .qr-beta-text {
        color: ${COLOR.info};
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 510;
        line-height: 24px;
        letter-spacing: -0.4px;
      }

      .box-qr-img {
        padding: 15px;
        border-radius: 16px;
        border: 1px solid ${COLOR.darkV2[16]};
      }

      .qr-image {
        width: 220px;
        height: 220px;
      }

      .box-qr-note {
        display: flex;
        padding: 8px 0px;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .qr-note {
        color: ${COLOR.darkV2[64]};
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 510;
        line-height: 24px;
        letter-spacing: -0.4px;
      }
    }
  }
`;

export const StyledVoiceCloning = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  .loading {
    padding-top: 30%;
  }
`;

export const StyledBox = styled(Box)`
  margin: 100px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    font-family: Lato;
    font-weight: bold;
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 30px;
    line-height: 1.5;
    text-align: center;
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
    margin: 16px auto;
    width: 50%;
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

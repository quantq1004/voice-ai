import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { Dialog, Popover, Typography, Slider } from '@mui/material';
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  MOBILE_BREAKPOINT,
} from '@src/styles/config';

export const StyledHome = styled('div')`
  width: 100%;
  margin-bottom: 16px;

  .box-voices {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
    padding: 16px;
    border-radius: ${BORDER_RADIUS};
    background: ${COLOR.white};
    margin: 8px 0px;
    height: fit-content;

    .box-home-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;

      .home-title {
        color: ${COLOR.darkBlue};
        font-size: 20px;
        font-weight: 700;
        line-height: 32px;
        word-wrap: break-word;
        font-style: normal;
        letter-spacing: -0.4px;
      }

      .generate-btn {
        min-height: 10px;
        min-width: 10px;
        height: 44px;
        width: 44px;
        border-radius: 50%;

        .add-icon {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    .box-voices {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 24px;
      background: none;
      padding: 0px;
      margin: 0px;
      margin-bottom: 208px;
      height: fit-content;

      .box-home-title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;

        .home-title {
          color: ${COLOR.darkBlue};
          font-style: normal;
          font-weight: 700;
          line-height: 28px;
          letter-spacing: -0.4px;
          word-wrap: break-word;
        }

        .generate-btn {
          min-height: 10px;
          min-width: 10px;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          padding: 0px;

          .add-icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
`;

export const StyledVoicesInformation = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;

  .box-title-icon-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    .title {
      color: ${COLOR.darkGray};
      font-size: 16px;
      font-weight: 700;
      line-height: 28px;
      word-wrap: break-word;
    }

    .arrow-icon-btn {
      padding: 8px;
      min-width: 10px;
      min-height: 10px;
      width: 32px;
      height: 32px;
      color: ${COLOR.darkBlue};
    }

    .arrow-icon-btn:focus {
      background: none;
    }
  }

  .voices {
    display: flex;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    gap: 16px;

    .voice {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.white};
      box-shadow: ${BOX_SHADOW};

      .avatar {
        border: 1px solid ${COLOR.darkV2[64]};
        width: 80px;
        height: 80px;
      }

      .voice-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;

        .name-info {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          gap: 4px;

          .name {
            color: ${COLOR.darkBlue};
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            word-wrap: break-word;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
          }
        }

        .category-info {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          gap: 4px;

          > * {
            color: ${COLOR.darkV2[64]};
            font-size: 14px;
            font-family: SF Pro;
            font-weight: 400;
            line-height: 20px;
            word-wrap: break-word;
          }
        }

        .status {
          padding-top: 4px;

          .processing-status {
            border-radius: 24px;
            padding: 4px 12px;
            width: fit-content;
            text-transform: none;
            background: ${COLOR.paleBlue};
            border: 1px solid ${COLOR.info};
            color: ${COLOR.info};

            .status-typo {
              font-size: 12px;
              font-family: SF Pro;
              font-weight: 510;
              line-height: 16px;
              word-wrap: break-word;
            }
          }

          .recording-status-btn {
            text-align: center;
            padding: 6px 10px;
            border-radius: 16px;
            width: 115px;
            background: ${COLOR.darkBlue};
            color: ${COLOR.white};
            text-transform: none;

            > * {
              font-size: 12px;
              font-weight: 510;
              line-height: 16px;
              word-wrap: break-word;
            }
          }
        }
      }

      .more-horiz-btn {
        padding: 8px;
        min-width: 10px;
        min-height: 10px;
        width: 32px;
        height: 32px;
        color: ${COLOR.darkBlue};

        &.disabled {
          color: ${COLOR.indigo[64]};
        }
      }
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;

    .box-title-icon-btn {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;

      .title {
        color: ${COLOR.darkGray};
        font-size: 16px;
        font-weight: 700;
        line-height: 28px;
        word-wrap: break-word;
      }

      .arrow-icon-btn {
        padding: 8px;
        min-width: 10px;
        min-height: 10px;
        width: 32px;
        height: 32px;
        color: ${COLOR.darkBlue};
      }

      .arrow-icon-btn:focus {
        background: none;
      }
    }

    .voices {
      display: flex;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      justify-content: space-between;
      gap: 16px;

      .voice {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border-radius: ${BORDER_RADIUS};
        background: ${COLOR.white};
        box-shadow: ${BOX_SHADOW};

        .avatar {
          border: 1px solid ${COLOR.darkV2[64]};
          width: 80px;
          height: 80px;
        }

        .voice-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;

          .name-info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            gap: 4px;
            width: calc(100vw - 192px);

            .name {
              color: ${COLOR.darkBlue};
              font-size: 16px;
              font-weight: 700;
              line-height: 24px;
              word-wrap: break-word;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 100%;
              white-space: nowrap;
            }
          }

          .category-info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            gap: 4px;

            > * {
              color: ${COLOR.darkV2[64]};
              font-size: 14px;
              font-family: SF Pro;
              font-weight: 400;
              line-height: 20px;
              word-wrap: break-word;
            }
          }

          .recording-status-btn {
            text-align: center;
            padding: 6px 10px;
            border-radius: 16px;
            width: 115px;
            background: ${COLOR.darkBlue};
            color: ${COLOR.white};
            text-transform: none;

            > * {
              font-size: 12px;
              white-space: nowrap;
              font-weight: 500;
            }
          }
        }

        .more-horiz-btn {
          padding: 8px;
          min-width: 10px;
          min-height: 10px;
          width: 32px;
          height: 32px;
          color: ${COLOR.darkBlue};

          &.disabled {
            color: ${COLOR.indigo[64]};
          }
        }
      }
    }
  }
`;

export const StylePopover = styled(Popover)`
  .MuiPaper-root {
    border-radius: 16px;
  }
`;

export const StyledMoreButtonDialogMobile = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 580px;
    width: 100%;
    position: fixed;
    height: fit-content;
    padding-bottom: 24px;
    bottom: -35px;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
  }

  .box-dialog {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${COLOR.white};
    padding: 16px 24px;

    .box-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid ${COLOR.darkV2[32]};

      .name-locale-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 4px;

        > * {
          color: ${COLOR.darkBlue};
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          word-wrap: break-word;
        }
      }

      .button-close {
        padding: 8px;
        min-width: 10px;
        width: 32px;
        height: 32px;
        color: ${COLOR.indigo[64]};
      }
    }

    .box-center {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .box-play-audio {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 16px;
        border-radius: ${BORDER_RADIUS};
        background: ${COLOR.darkV2[8]};
        height: 56px;
        padding: 0px 12px;

        .button-play {
          padding: 8px;
          min-width: 10px;
          min-height: 10px;
          width: 40px;
          height: 40px;
          background: ${COLOR.primary};
          color: ${COLOR.darkBlue};

          > * {
            font-size: 28px;
          }

          &.disabled {
            background: ${COLOR.yellow[32]};
            color: ${COLOR.indigo[64]};
          }
        }
      }

      .note-released {
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: ${COLOR.info};
        text-align: center;
      }

      .use-now-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 510;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        width: 100%;
        text-transform: none;
        border-radius: ${BORDER_RADIUS};
        height: 48px;

        &.disabled {
          background: ${COLOR.yellow[32]};
          color: ${COLOR.indigo[64]};
        }
      }

      .box-released {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: ${BORDER_RADIUS};
        border: 1px solid ${COLOR.darkV2[32]};
        gap: 16px;

        &.disabled {
          border: 1px solid ${COLOR.darkV2[16]};
        }

        .released {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          gap: 32px;
          height: 48px;
          width: 95%;

          .released-text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 16px;
            color: ${COLOR.darkBlue};
            font-weight: 510;
            line-height: 24px;

            &.disabled {
              color: ${COLOR.indigo[64]};
            }
          }
        }

        .radio-group {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 32px;
          width: 95%;
          background: ${COLOR.darkV2[8]};
          border-radius: ${BORDER_RADIUS};
          height: 48px;
          margin-bottom: 8px;
          color: ${COLOR.darkBlue};

          .radio {
            &.Mui-checked {
              color: ${COLOR.darkBlue};
            }
          }
        }
      }

      .rename-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 510;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        width: 100%;
        text-transform: none;
        border-radius: ${BORDER_RADIUS};
        border: 1px solid ${COLOR.darkV2[32]};
        height: 48px;
      }
    }
  }
`;

export const StyledMoreButtonPopoverDesktop = styled('div')`
  .box-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${COLOR.white};
    padding: 16px;
    width: 270px;
    border-radius: 16px;
    box-shadow: ${BOX_SHADOW};

    .box-center {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .note-released {
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: ${COLOR.info};
        text-align: center;
        width: fit-content;
        flex-wrap: nowrap;
      }

      .use-now-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        width: 100%;
        text-transform: none;
        border-radius: ${BORDER_RADIUS};
        height: 48px;

        &.disabled {
          background: ${COLOR.yellow[32]};
          color: ${COLOR.indigo[64]};
        }
      }

      .box-released {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: ${BORDER_RADIUS};
        border: 1px solid ${COLOR.darkV2[32]};

        &.disabled {
          border: 1px solid ${COLOR.darkV2[16]};
        }

        .released {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          gap: 32px;
          height: 48px;
          width: 95%;

          .released-text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 16px;
            color: ${COLOR.darkBlue};
            font-weight: 510;
            line-height: 24px;

            &.disabled {
              color: ${COLOR.indigo[64]};
            }
          }
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 8px;
          width: 95%;
          background: ${COLOR.darkV2[8]};
          border-radius: ${BORDER_RADIUS};
          margin-bottom: 8px;
          color: ${COLOR.darkBlue};

          .radio {
            padding-left: 32px;

            &.Mui-checked {
              color: ${COLOR.darkBlue};
            }
          }
        }
      }

      .hear-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        width: 100%;
        text-transform: none;
        border-radius: ${BORDER_RADIUS};
        border: 1px solid ${COLOR.darkV2[32]};
        height: 48px;

        &.disabled {
          color: ${COLOR.indigo[64]};
          border: 1px solid ${COLOR.darkV2[16]};
        }
      }

      .rename-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        width: 100%;
        text-transform: none;
        border-radius: ${BORDER_RADIUS};
        border: 1px solid ${COLOR.darkV2[32]};
        height: 48px;
      }
    }
  }
`;

export const StyledChip = styled(Typography)`
  background-color: ${({ color }) => TRANSPARENT_COLOR[color]};
  color: ${({ color }) => COLOR[color]};
  text-align: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 510;
  white-space: nowrap;
  width: 95px;
`;

export const StyledUnreleasedDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 580px;
    border-radius: 12px;
    width: 25%;
    height: auto;
    padding: 24px;
  }

  .box-dialog {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;

    .title {
      display: flex;
      justify-content: center;
      align-self: center;
      font-size: 16px;
      font-weight: 510;
      line-height: 24px;
      color: ${COLOR.darkBlue};
      padding: 0px;
    }

    .box-text {
      .note {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: ${COLOR.darkGray};
        text-align: center;
      }

      .warning {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: ${COLOR.red};
        text-align: center;
        padding-bottom: 8px;
      }
    }

    .text-field {
      width: 100%;

      .MuiInputBase-root {
        border-radius: 12px;
      }
    }

    .box-button {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      > * {
        border-radius: 24px;
        min-height: 10px;
        height: 44px;
        text-transform: none;
        width: 48%;
        color: ${COLOR.darkBlue};
        border: 1px solid ${COLOR.primary};
      }

      .agree {
        border: 1px solid ${COLOR.lightDivider};
      }
    }
  }
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    .MuiDialog-paper {
      max-width: 580px;
      border-radius: 12px;
      width: 90%;
      height: auto;
      padding: 16px;
    }

    .box-dialog {
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      align-items: center;

      .title {
        display: flex;
        justify-content: center;
        align-self: center;
        font-size: 16px;
        font-weight: 510;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        padding: 0px;
      }

      .box-text {
        .note {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: ${COLOR.darkGray};
          text-align: center;
        }

        .warning {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: ${COLOR.red};
          text-align: center;
          padding-bottom: 8px;
        }
      }

      .text-field {
        width: 100%;

        .MuiInputBase-root {
          border-radius: 12px;
        }
      }

      .box-button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        > * {
          border-radius: 24px;
          min-height: 10px;
          height: 44px;
          text-transform: none;
          width: 48%;
          color: ${COLOR.darkBlue};
          border: 1px solid ${COLOR.primary};
        }

        .agree {
          border: 1px solid ${COLOR.lightDivider};
        }
      }
    }
  }
`;

export const StyledRenameDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 580px;
    border-radius: 12px;
    width: 25%;
    height: auto;
    padding: 24px;
  }

  .box-dialog {
    display: flex;
    flex-direction: column;
    gap: 28px;
    justify-content: center;
    align-items: center;

    .box-input {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;

      .error {
        color: ${COLOR.error};
        font-size: 12px;
      }
    }

    .title {
      display: flex;
      justify-content: center;
      align-self: center;
      font-size: 16px;
      font-weight: 510;
      line-height: 24px;
      color: ${COLOR.darkBlue};
      padding: 0px;
    }

    .text-field {
      width: 100%;

      .MuiInputBase-root {
        border-radius: 12px;
      }
    }

    .box-button {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      > * {
        border-radius: 24px;
        min-height: 10px;
        height: 44px;
        text-transform: none;
        width: 48%;
        color: ${COLOR.darkBlue};
        border: 1px solid ${COLOR.primary};
      }

      .cancel {
        border: 1px solid ${COLOR.lightDivider};
      }

      .disabled {
        background: ${COLOR.yellow[32]};
        color: ${COLOR.darkV2[64]};
        border: 1px solid ${COLOR.yellow[32]};
      }
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    .MuiDialog-paper {
      max-width: 580px;
      border-radius: 12px;
      width: 90%;
      height: auto;
      padding: 16px;
    }

    .box-dialog {
      display: flex;
      flex-direction: column;
      gap: 24px;
      justify-content: center;
      align-items: center;

      .title {
        display: flex;
        justify-content: center;
        align-self: center;
        font-size: 16px;
        font-weight: 510;
        line-height: 24px;
        color: ${COLOR.darkBlue};
        padding: 0px;
      }

      .text-field {
        width: 100%;

        .MuiInputBase-root {
          border-radius: 12px;
        }
      }

      .box-button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        > * {
          border-radius: 24px;
          min-height: 10px;
          height: 44px;
          text-transform: none;
          width: 48%;
          color: ${COLOR.darkBlue};
          border: 1px solid ${COLOR.primary};
        }

        .cancel {
          border: 1px solid ${COLOR.lightDivider};
        }

        .disabled {
          background: ${COLOR.yellow[32]};
          color: ${COLOR.darkV2[64]};
          border: 1px solid ${COLOR.yellow[32]};
        }
      }
    }
  }
`;

export const StyledAudioSlider = styled(Slider)({
  color: COLOR.primary,
  height: 6,
  padding: 0,

  '& .MuiSlider-track': {
    border: 'none',
  },

  '& .MuiSlider-thumb': {
    height: '16px',
    width: '16px',
    backgroundColor: COLOR.white,
    border: `1px solid currentColor`,
  },

  '& .MuiSlider-rail': {
    color: COLOR.secondary[24],
  },
});

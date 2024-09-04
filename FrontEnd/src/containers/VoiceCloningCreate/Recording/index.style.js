import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledRecording = styled('div')`
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${COLOR.darkBlue};

    .arrow-button {
      padding: 8px;
      width: 32px;
      height: 32px;
      min-width: 10px;
    }

    .arrow-button:focus {
      background: none;
    }

    .arrow-right-icon {
      width: 24px;
      height: 24px;
      color: ${COLOR.darkBlue};
      align-items: center;
      align-self: center;

      &.disabled {
        color: ${COLOR.darkV2[64]};
      }
    }

    .box-number-sentence {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .current-sentence {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: -0.4px;
        color: ${COLOR.darkBlue};
      }

      .total-sentences {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        letter-spacing: -0.4px;
        color: ${COLOR.darkV2[64]};
      }
    }

    .grid-button {
      min-width: 10px;
      width: 32px;
      height: 32px;
      padding: 8px;
    }

    .grid-button:focus {
      background: none;
    }

    .grid-button-icon {
      color: ${COLOR.darkBlue};

      &.disabled {
        color: ${COLOR.darkV2[64]};
      }
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0px;
    padding: 24px;
    background: ${COLOR.white};
    border-radius: ${BORDER_RADIUS};
    gap: 16px;
    height: calc(100vh - 348px);

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;

      .box-text {
        .text {
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          word-wrap: break-word;
          color: ${COLOR.darkGray};

          .box-word {
            font-weight: 700;
            color: ${COLOR.blueV2};
            border-radius: 6px;
          }
        }
      }

      .divider {
        border: 1px solid ${COLOR.secondary[80]};
      }

      .box-nsw {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-self: start;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0px;

        .box-text-nsw {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          color: ${COLOR.black.default};
          font-size: 14px;
          line-height: 20px;
          word-wrap: break-word;
          border-radius: 8px;
          background: ${COLOR.charcoal};
          text-transform: none;
          border: 1px solid ${COLOR.white};

          .original {
            font-weight: 700;
          }

          .normalized {
            font-weight: 400;
          }
        }
      }
    }

    .box-show-recording {
      display: flex;
      flex-direction: column;
      gap: 32px;
      width: 100%;

      .box-text {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }

      .recording-text {
        font-size: 16px;
        font-family: SF Pro;
        font-weight: 510;
        line-height: 24px;
        word-wrap: break-word;
        color: ${COLOR.darkV2[32]};
      }
    }
  }

  .bottom {
    display: flex;
    flex-direction: row;
    padding-top: 16px;
    padding-bottom: 0px;
    position: fixed;
    bottom: 0;
    left: 0px;
    right: 0px;

    .action-button {
      width: 100%;
      text-transform: none;
      height: 72px;
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 12px, 16px, 24px, 16px;
      align-items: center;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      letter-spacing: -0.4px;
      color: ${COLOR.blue};
      border-radius: 0px;
    }

    .pending-button {
      border: 1px solid transparent;
      color: ${COLOR.indigo[100]};
    }

    .rehear-button {
      background-color: ${COLOR.white};
    }

    .rehear-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-family: SF Pro;
      font-weight: 510;
      line-height: 16px;
      word-wrap: break-word;
      color: ${COLOR.darkBlue};

      .rehear-icon {
        width: 26px;
        height: 26px;
      }

      &.disabled {
        color: ${COLOR.darkV2[64]};
      }
    }

    .record-button {
      background: ${COLOR.primary};
    }

    .record-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-family: SF Pro;
      font-weight: 510;
      line-height: 16px;
      word-wrap: break-word;
      color: ${COLOR.darkBlue};

      .record-icon {
        width: 26px;
        height: 26px;
      }

      &.disabled {
        color: ${COLOR.darkV2[64]};
      }

      .progress {
        color: ${COLOR.labelBlue};
      }
    }

    .next-sentence-button {
      background: ${COLOR.white};
    }

    .next-sentence-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-family: SF Pro;
      font-weight: 510;
      line-height: 16px;
      word-wrap: break-word;
      color: ${COLOR.darkBlue};

      .next-sentence-icon {
        width: 24px;
        height: 24px;
      }

      &.disabled {
        color: ${COLOR.darkV2[64]};
      }
    }
  }
`;

export const StyledCheckAudioQuality = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  .box-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .evaluate-text {
      font-size: 14px;
      font-family: SF Pro;
      font-weight: 510;
      line-height: 20px;
      word-wrap: break-word;
      color: ${COLOR.darkGray};
    }
  }

  .box-quality {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2px;

    .box-quality-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border-right: 1px solid ${COLOR.darkV2[16]};
      gap: 2px;
      padding: 0px 12px;

      .quality-text {
        font-size: 12px;
        font-family: SF Pro;
        font-weight: 400;
        line-height: 16px;
        word-wrap: break-word;
        color: ${COLOR.darkV2[64]};
      }

      .check-icon {
        color: ${COLOR.greenV2.default};
        width: 32px;
        height: 32px;
      }

      .close-icon {
        color: ${COLOR.functionalRed.default};
        width: 32px;
        height: 32px;
      }

      &.last-item {
        border-right: none;
      }
    }
  }
`;

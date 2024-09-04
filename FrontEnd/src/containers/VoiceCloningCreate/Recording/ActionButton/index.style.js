import { styled } from '@mui/material/styles';
import { Dialog, MenuItem } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledGridSentenceButton = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 580px;
    width: 100%;
    height: 70%;
    position: fixed;
    bottom: -35px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }

  .box-dialog {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${COLOR.white};
    padding: 16px 24px;
    overflow: hidden;

    .box-grid-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      .grid-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        word-wrap: break-word;
        color: ${COLOR.indigo.default};
      }

      .button-close {
        padding: 8px;
        min-width: 10px;
        width: 32px;
        height: 32px;
        color: ${COLOR.indigo[64]};
      }
    }

    .box-sentence-select {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .type-select {
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        word-wrap: break-word;
        color: ${COLOR.darkGray};
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

      .status-select {
        min-height: 10px;
        min-width: 10px;
        width: 140px;
        border: 1px solid ${COLOR.darkV2[32]};
        border-radius: 8px;
        padding-left: 4px;

        .MuiSelect-select {
          padding: 8px;
          padding-right: 32px;
          color: ${COLOR.darkBlue};
        }

        .MuiOutlinedInput-notchedOutline {
          border: none;
        }
      }
    }

    .image-empty {
      margin: auto 0px;
      display: flex;
      justify-content: center;
      align-self: center;
      align-items: center;
      width: 180px;
      padding-top: 32px;
    }

    .box-sentence {
      margin: 8px 0px;
      padding: 8px 8px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
      flex: 1;
      overflow-y: auto;
      padding-bottom: 72px;

      .sentence-btn {
        min-width: 10px;
        width: 100%;
        aspect-ratio: 1 / 1;
        padding: 0px;
        border-radius: ${BORDER_RADIUS};
        font-size: 18px;
        font-weight: 510;
        line-height: 28px;
        word-wrap: break-word;
        justify-self: center;
        align-self: center;
      }

      .disabled {
        background: ${COLOR.darkV2[8]};
        color: ${COLOR.darkV2[32]};
      }

      .failed {
        background: ${COLOR.functionalRed[8]};
        border: 1px solid ${COLOR.functionalRed.default};
        color: ${COLOR.functionalRed.default};
      }

      .improvement-needed {
        background: ${TRANSPARENT_COLOR.alert};
        border: 1px solid ${COLOR.alert};
        color: ${COLOR.alert};
      }

      .passed {
        background: ${COLOR.greenV2[8]};
        border: 1px solid ${COLOR.greenV2.default};
        color: ${COLOR.greenV2.default};
      }

      .current-sentence {
        background: ${COLOR.white};
        border: 1px solid ${COLOR.darkBlue};
        color: ${COLOR.darkBlue};
      }
    }

    .box-send {
      display: flex;
      flex-direction: row;
      padding: 16px;
      position: fixed;
      bottom: 0;
      left: 0px;
      right: 0px;

      .action-button {
        width: 100%;
        text-transform: none;
        height: 56px;
        display: flex;
        justify-content: center;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        letter-spacing: -0.4px;
        border-radius: 500px;
        color: ${COLOR.blue};
      }

      .pending-button {
        border: 1px solid transparent;
        color: ${COLOR.indigo[100]};
      }

      .send {
        width: 100%;
        height: 48px;
      }
    }
  }
`;

const COLOR_STATUS_FOR_LABEL = {
  allSentence: COLOR.darkBlue,
  passedSentence: COLOR.greenV2.default,
  improvementNeededSentence: COLOR.alert,
  failedSentence: COLOR.functionalRed.default,
};

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: ${(props) => COLOR_STATUS_FOR_LABEL[props.label]};
  width: 200px;
  border-radius: 8px;
  margin: 0 8px;

  & {
    &:hover,
    :focus {
      color: ${(props) => COLOR_STATUS_FOR_LABEL[props.label]} !important;
      background: ${COLOR.indigo[8]} !important;

      .check-icon {
        color: ${COLOR.darkBlue};
      }
    }
  }
`;

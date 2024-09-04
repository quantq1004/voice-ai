import { styled } from '@mui/material/styles';
import { Box, Dialog } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS, BOX_SHADOW } from '@src/styles/config';

export const StyledCategoryPick = styled('div')`
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${COLOR.darkBlue};

    .arrow-button {
      padding: 8px;
      width: 32px;
      height: 32px;
      min-width: 10px;
      background: none;
    }

    .arrow-button:focus {
      background: none;
    }

    .arrow-right-icon {
      width: 24px;
      height: 24px;
      color: ${COLOR.darkBlue};
    }

    .text-purpose {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'SF Pro';
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.4px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 104px;
  }

  .loading {
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom {
    padding: 16px 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: ${COLOR.background};

    .action-button {
      margin: 0px 16px;
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
  }
`;

export const StyledCategoryList = styled(Box)`
  & {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    padding: 24px 0px;
    gap: 8px;
  }
`;

export const StyledCategoryMethodItem = styled(Box)`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  height: 30px;
  min-width: 120px;
  width: auto;
  border-radius: ${BORDER_RADIUS};
  padding: 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 510;
  line-height: 24px;
  letter-spacing: -0.4px;
  background: ${COLOR.white};
  box-shadow: ${BOX_SHADOW};
  border: 2px solid ${COLOR.white};

  .logo-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    .make-emojis-large {
      font-size: 24px;
      width: 32px;
      height: 32px;
    }

    .logo-content {
      size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: black;
    }
  }

  &.selected {
    border: 2px solid ${COLOR.indigo[64]};
  }
`;

export const StyledAddInformation = styled('div')`
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${COLOR.darkBlue};

    .arrow-button {
      padding: 8px;
      width: 32px;
      height: 32px;
      min-width: 10px;
      background: none;
    }

    .arrow-button:focus {
      background: none;
    }

    .arrow-right-icon {
      width: 24px;
      height: 24px;
      color: ${COLOR.darkBlue};
    }

    .text-note {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'SF Pro';
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.4px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;
    margin-bottom: 104px;

    .box-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 0px;
    }

    .avatar {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: center;
      width: 80px;
      height: 80px;

      .avatar-img {
        border: 1px solid ${COLOR.darkV2[64]};
        width: 80px;
        height: 80px;
      }

      .icon-box {
        position: absolute;
        width: 24px;
        height: 24px;
        left: 56px;
        top: 56px;
        background: ${COLOR.darkV2[64]};
        padding: 0px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 16px;
          height: 16px;
          color: ${COLOR.white};
        }
      }
    }

    .error-message {
      color: ${COLOR.error};
      font-size: 12px;
    }

    .border-error {
      border: 1px solid ${COLOR.error} !important;
    }

    .title-field {
      font-size: 16px;
      font-style: normal;
      font-weight: 510;
      line-height: 24px;
      letter-spacing: -0.4px;
      color: ${COLOR.darkGray};
    }

    .voice-name {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 12px;
      color: ${COLOR.darkGray};
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .text-field-name {
        position: absolute;
        right: 12px;
        font-family: 'SF Pro';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        border: none;
        text-align: right;
        background: none;
        padding: 0px;
        color: ${COLOR.black.default};
        width: 65%;
      }

      .text-field-name:focus {
        outline: none;
      }
    }

    .username {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 12px;
      color: ${COLOR.darkGray};
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .text-field-name {
        position: absolute;
        right: 12px;
        font-family: 'SF Pro';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        border: none;
        text-align: right;
        background: none;
        padding: 0px;
        color: ${COLOR.black.default};
        width: 65%;
      }

      .text-field-name:focus {
        outline: none;
      }
    }

    .gender {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      gap: 12px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .gender-box-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        background: ${COLOR.white};
        border: 1px solid ${COLOR.darkV2[32]};
      }

      .gender-button {
        display: flex;
        width: 72px;
        height: 36px;
        padding: 0px 12px;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        text-transform: none;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        color: ${COLOR.darkV2[32]};
        border-radius: 0;

        &.button-right {
          border-right: 1px solid ${COLOR.darkV2[32]};
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &.button-left {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }

      .selected {
        background: ${COLOR.darkV2[16]};
        color: ${COLOR.black.default};
      }
    }

    .locale {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      gap: 12px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .locale-box-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        background: ${COLOR.white};
        border: 1px solid ${COLOR.darkV2[32]};
      }

      .locale-button {
        display: flex;
        width: fit-content;
        height: 36px;
        padding: 0px 12px;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        text-transform: none;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        color: ${COLOR.darkV2[32]};
        border-radius: 0;

        &.northern {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &.central {
          border-right: 1px solid ${COLOR.darkV2[32]};
          border-left: 1px solid ${COLOR.darkV2[32]};
        }

        &.southern {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }

      .selected {
        background: ${COLOR.darkV2[16]};
        color: ${COLOR.black.default};
      }
    }

    .province {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      gap: 12px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .province-button {
        display: flex;
        text-transform: none;
        font-size: 16px;
        min-height: 10px;
        min-width: 10px;
        height: 36px;
        padding: 0px 10px;

        .select {
          color: ${COLOR.darkV2[64]};
          border: none;
          background: none;
          padding: 0px;
        }

        .disabled {
          color: ${COLOR.darkV2[32]};
          border: none;
          background: none;
          padding: 0px;
        }

        .province {
          color: ${COLOR.black.default};
          border: none;
          background: none;
          padding: 0px;
        }

        .loading {
          width: 24px;
          height: 24px;
          padding-left: 4px;
        }

        .icon {
          width: 24px;
          height: 24px;
          padding-left: 4px;
          color: ${COLOR.darkV2[64]};
        }
      }

      .province-button:focus {
        background: none;
      }
    }
  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    padding: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${COLOR.background};

    .back-button {
      border: 1px solid ${COLOR.darkBlue} !important;
    }

    .action-button {
      width: 50%;
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
      color: ${COLOR.darkBlue};
    }

    .pending-button {
      border: 1px solid transparent;
      color: ${COLOR.indigo[100]};
    }
  }
`;

export const StyledNotes = styled('div')`
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${COLOR.darkBlue};

    .arrow-button {
      padding: 8px;
      width: 32px;
      height: 32px;
      min-width: 10px;
      background: none;
    }

    .arrow-button:focus {
      background: none;
    }

    .arrow-right-icon {
      width: 24px;
      height: 24px;
      color: ${COLOR.darkBlue};
    }

    .text-note-header {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'SF Pro';
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.4px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 16px;
    gap: 24px;
    margin-bottom: 104px;

    .box-center {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      color: ${COLOR.whiteV2[64]};
    }
  }

  .bottom {
    padding: 16px 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: ${COLOR.background};

    .action-button {
      margin: 0px 16px;
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
  }
`;

export const StyledNoteItem = styled('div')`
  .box-icon-note {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 16px;
    gap: 11px;
    background: ${COLOR.white};
    border-bottom: 1px solid ${COLOR.darkV2[16]};
  }

  .box-icon-note.first {
    border-top-left-radius: ${BORDER_RADIUS};
    border-top-right-radius: ${BORDER_RADIUS};
  }

  .box-icon-note.last {
    border-bottom-left-radius: ${BORDER_RADIUS};
    border-bottom-right-radius: ${BORDER_RADIUS};
  }

  .box-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto 0;

    > * {
      width: 32px;
      height: 32px;
    }
  }

  .box-note {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .note-title {
    font-family: 'SF Pro';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    color: ${COLOR.darkGray};
  }

  .note-text {
    font-family: 'SF Pro';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: ${COLOR.darkV2[64]};
  }
`;

export const StyledCheckInformation = styled('div')`
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${COLOR.darkBlue};

    .arrow-button {
      padding: 8px;
      width: 32px;
      height: 32px;
      min-width: 10px;
      background: none;
    }

    .arrow-button:focus {
      background: none;
    }

    .arrow-right-icon {
      width: 24px;
      height: 24px;
      color: ${COLOR.darkBlue};
    }

    .text-note {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'SF Pro';
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.4px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;
    margin-bottom: 176px;

    .box-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 0px;
    }

    .avatar {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: center;
      width: 80px;
      height: 80px;

      .avatar-img {
        border: 1px solid ${COLOR.darkV2[64]};
        width: 80px;
        height: 80px;
      }

      .icon-box {
        position: absolute;
        width: 24px;
        height: 24px;
        left: 56px;
        top: 56px;
        background: ${COLOR.darkV2[64]};
        padding: 0px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 16px;
          height: 16px;
          color: ${COLOR.white};
        }
      }
    }

    .error-message {
      color: ${COLOR.error};
      font-size: 12px;
    }

    .border-error {
      border: 1px solid ${COLOR.error} !important;
    }

    .title-field {
      font-size: 16px;
      font-style: normal;
      font-weight: 510;
      line-height: 24px;
      letter-spacing: -0.4px;
      color: ${COLOR.darkGray};
    }

    .voice-name {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 12px;
      color: ${COLOR.darkGray};
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .text-field-name {
        position: absolute;
        right: 12px;
        font-family: 'SF Pro';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        border: none;
        text-align: right;
        background: none;
        padding: 0px;
        padding-right: 25px;
        color: ${COLOR.darkGray};
        width: 60%;
      }

      .text-field-name:focus {
        outline: none;
      }

      .icon {
        width: 16px;
        height: 16px;
        color: ${COLOR.darkV2[64]};
        padding: 4px;
      }
    }

    .username {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 12px;
      color: ${COLOR.darkGray};
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .text-field-name {
        position: absolute;
        right: 12px;
        font-family: 'SF Pro';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        border: none;
        text-align: right;
        background: none;
        padding: 0px;
        padding-right: 25px;
        color: ${COLOR.darkGray};
        width: 60%;
      }

      .text-field-name:focus {
        outline: none;
      }

      .icon {
        width: 16px;
        height: 16px;
        color: ${COLOR.darkV2[64]};
        padding: 4px;
      }
    }

    .gender {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 16px 12px;
      gap: 12px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .gender-text {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: ${COLOR.black.default};
        padding-right: 8px;
      }
    }

    .locale {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      gap: 12px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .locale-box-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        background: ${COLOR.white};
        border: 1px solid ${COLOR.darkV2[32]};
      }

      .locale-button {
        display: flex;
        width: fit-content;
        height: 36px;
        padding: 0px 12px;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        text-transform: none;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: -0.4px;
        color: ${COLOR.darkV2[32]};
        border-radius: 0;

        &.northern {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &.central {
          border-right: 1px solid ${COLOR.darkV2[32]};
          border-left: 1px solid ${COLOR.darkV2[32]};
        }

        &.southern {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }

      .selected {
        background: ${COLOR.darkV2[16]};
        color: ${COLOR.black.default};
      }
    }

    .province {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      gap: 12px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .province-button {
        display: flex;
        text-transform: none;
        font-size: 16px;
        min-height: 10px;
        min-width: 10px;
        height: 36px;
        padding: 0px;
        padding-left: 10px;

        .select {
          color: ${COLOR.darkV2[64]};
          border: none;
          background: none;
          padding: 0px;
        }

        .disabled {
          color: ${COLOR.darkV2[32]};
          border: none;
          background: none;
          padding: 0px;
        }

        .province {
          color: ${COLOR.black.default};
          border: none;
          background: none;
          padding: 0px;
        }

        .loading {
          width: 24px;
          height: 24px;
          padding-left: 4px;
        }

        .icon {
          width: 24px;
          height: 24px;
          padding-left: 4px;
          color: ${COLOR.darkV2[64]};
        }
      }

      .province-button:focus {
        background: none;
      }
    }

    .box-category {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 7px 12px;
      padding-left: 6px;
      gap: 8px;
      border: 1px solid ${COLOR.darkV2[16]};
      border-radius: ${BORDER_RADIUS};
      background: ${COLOR.whiteV2[64]};

      .make-emojis-large {
        font-size: 24px;
        width: 32px;
        height: 32px;
        padding-bottom: 10px;
      }

      .category-name {
        font-size: 16px;
        font-style: normal;
        font-weight: 510;
        line-height: 24px;
        letter-spacing: -0.4px;
        color: ${COLOR.darkGray};
      }
    }

    .loading {
      height: 85vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .bottom {
    padding: 16px 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: ${COLOR.background};

    .action-button {
      margin: 0px 16px;
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
      color: ${COLOR.darkBlue};
    }

    .pending-button {
      border: 1px solid transparent;
      color: ${COLOR.indigo[100]};
    }
  }
`;

export const StyledSentenceList = styled('div')`
  .box-sentence-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    background: ${COLOR.white};
    border-radius: ${BORDER_RADIUS};
    padding: 12px;

    .title {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      text-align: left;
      color: ${COLOR.darkBlue};
    }

    .sentences {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;

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
    }
  }
`;

export const StyledSendRequest = styled('div')`
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${COLOR.darkBlue};

    .arrow-button {
      padding: 8px;
      width: 32px;
      height: 32px;
      min-width: 10px;
      background: none;
    }

    .arrow-button:focus {
      background: none;
    }

    .arrow-right-icon {
      width: 24px;
      height: 24px;
      color: ${COLOR.darkBlue};
    }

    .send-request {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.4px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 32px;
    gap: 24px;
    margin-bottom: 104px;

    .input-email {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      text-align: left;
      color: ${COLOR.darkBlue};
    }

    .sent-email {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin: 0px 16px;

      .box-text-field {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        background: white;
        border-radius: 24px;
        padding: 6px 16px;
        border: 1px solid ${COLOR.darkV2[32]};
        width: 100%;

        .text-field {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          text-align: left;
          color: ${COLOR.darkV2[80]};
          .MuiInput-input {
            padding: 4px;
          }
        }
      }

      .error-message {
        color: ${COLOR.error};
        font-size: 14px;
      }
    }

    .note-request {
      background-color: ${COLOR.paleBlue};
      border-radius: 12px;
      padding: 6px 8px;

      > * {
        color: ${COLOR.info};
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
      }
    }
  }

  .bottom {
    padding: 16px 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: ${COLOR.background};

    .action-button {
      margin: 0px 16px;
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
  }
`;

export const StyledProvincesList = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 580px;
    width: 100%;
    height: 60%;
    position: fixed;
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
    overflow: hidden;

    .box-search {
      .search {
        padding-top: 16px;
        .MuiOutlinedInput-root {
          border-radius: ${BORDER_RADIUS};
          height: 45px;
        }
      }
    }

    .provinces {
      flex: 1;
      overflow-y: auto;
      border-radius: ${BORDER_RADIUS};
      border: 1px solid ${COLOR.darkV2[32]};

      .province {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: ${COLOR.darkGray};
        width: 100%;
        text-transform: none;
        border-radius: 0;
        border-top: 1px solid ${COLOR.darkV2[32]};

        &.first {
          border-top: none;
        }

        &:hover {
          background: ${COLOR.darkV2[8]};
        }
      }
    }
  }
`;

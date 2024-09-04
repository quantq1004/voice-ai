import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowBackRounded, EmailRounded } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import { VOICE_STATUS } from '@src/constants/voiceCloning';
import { validateEmail } from '@src/utils/checkValid';
import { StyledSendRequest } from './index.style';

const SendRequest = ({ onNextStep, onPreviousStep, voiceRecording }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitUpdateVoice = async () => {
    if (!email) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'emailRequired',
        }),
      );
      return;
    }

    if (!validateEmail(email)) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'emailInvalid',
        }),
      );
      return;
    }
    const voiceStatus = VOICE_STATUS.PROCESSING;
    setLoading(true);
    const response = await apis.voiceCloning.updateVoiceCloningVoice(
      voiceRecording.id,
      { email, status: voiceStatus },
    );

    if (!response?.status) {
      if (response?.errorCode) {
        dispatch(
          actions.noti.push({
            severity: 'error',
            code: response?.errorCode,
          }),
        );
        setLoading(false);
        return;
      }
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'addEmailFailed',
        }),
      );
      setLoading(false);
      return;
    }
    dispatch(
      actions.noti.push({
        severity: 'success',
        message: 'successfullyReceivedRequest',
      }),
    );

    const updatedVoiceInfo = {
      ...voiceRecording,
      email,
      status: voiceStatus,
    };
    dispatch(actions.voiceVoiceCloning.addVoice(updatedVoiceInfo));
    setLoading(false);
    onNextStep();
  };

  return (
    <StyledSendRequest>
      <Backdrop sx={{ zIndex: '9999999' }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Box className="top">
        <Button className="arrow-button">
          <ArrowBackRounded
            className="arrow-right-icon"
            onClick={onPreviousStep}
          />
        </Button>
        <Typography className="send-request">{t('inputEmail')}</Typography>
      </Box>
      <Box className="center">
        <Box className="sent-email">
          <Box className="box-text-field">
            <EmailRounded />
            <TextField
              variant="standard"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder={t('inputEmail')}
              className="text-field"
              InputProps={{ disableUnderline: true }}
            />
          </Box>
        </Box>
        <Box className="note-request">
          <Typography>{t('noteSendRequest')}</Typography>
        </Box>
      </Box>
      <Box className="bottom">
        <Button
          variant="contained"
          className="action-button pending-button"
          onClick={handleSubmitUpdateVoice}
        >
          {t('sendVoiceRequest')}
        </Button>
      </Box>
    </StyledSendRequest>
  );
};

export default SendRequest;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_LENGTH_VOICE_NAME } from '@src/constants/voiceCloning';
import { StyledRenameDialog } from './index.style';

const RenameDialog = ({ open, onClose, onVoiceInfoChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { voice: voiceInfo } = useSelector((state) => state.voiceVoiceCloning);
  const [loading, setLoading] = useState(false);
  const [voiceName, setVoiceName] = useState('');
  const [voiceNameError, setVoiceNameError] = useState(false);

  const checkVoiceName = (value) => {
    if (value.length > MAX_LENGTH_VOICE_NAME) {
      setVoiceNameError(t('voiceNameLength', { max: MAX_LENGTH_VOICE_NAME }));
      return false;
    }
    setVoiceNameError(false);
    return true;
  };

  const handleChangeVoiceName = (value) => {
    setVoiceNameError(false);
    setVoiceName(value);
  };

  const handleUpdateVoice = async () => {
    const validName = checkVoiceName(voiceName);
    if (!validName) return;

    setLoading(true);
    const response = await apis.voiceCloning.updateVoiceCloningVoice(
      voiceInfo.id,
      { name: voiceName },
    );

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'updateVoiceNameFailed',
        }),
      );
      setLoading(false);
      return;
    }
    dispatch(
      actions.noti.push({
        severity: 'success',
        message: 'updateVoiceNameSuccess',
      }),
    );

    onVoiceInfoChange(voiceInfo.id, { name: voiceName });
    setVoiceName('');
    setLoading(false);
    onClose(false);
  };

  const handleSaveVoiceName = async () => {
    if (voiceName.trim() === voiceInfo.name) {
      onClose();
      return;
    }
    await handleUpdateVoice();
  };

  useEffect(() => {
    setVoiceName(voiceInfo.name);
  }, [voiceInfo.name]);

  return (
    <StyledRenameDialog open={open} onClose={onClose}>
      <Backdrop sx={{ zIndex: '9999999' }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Box className="box-dialog">
        <Typography className="title">{t('rename')}</Typography>
        <Box className="box-input">
          <TextField
            size="small"
            name="rename"
            value={voiceName}
            onChange={(e) => handleChangeVoiceName(e.target.value)}
            placeholder={t('rename')}
            className="text-field"
            InputProps={{ disableUnderline: true }}
          />
          {voiceNameError && (
            <Typography className="error">{voiceNameError}</Typography>
          )}
        </Box>
        <Box className="box-button">
          <Button onClick={onClose} className="cancel">
            {t('cancel')}
          </Button>
          <Button
            onClick={handleSaveVoiceName}
            variant="contained"
            disabled={!voiceName}
            className={!voiceName ? 'disabled' : ''}
          >
            {t('saveName')}
          </Button>
        </Box>
      </Box>
    </StyledRenameDialog>
  );
};

export default RenameDialog;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Typography, Box, Avatar } from '@mui/material';
import QRCode from 'qrcode.react';
import LogoAIVoice from '@src/assets/logo/call.png';
import { CRM_URL } from '@src/configs';
import { getCategoryLabel } from '@src/services/voiceCloning';
import { StyledQRVoiceRecordingDialog } from './index.style';

const QRVoiceRecordingDialog = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { voice: voiceRecording } = useSelector(
    (state) => state.voiceVoiceCloning,
  );
  const urlToShow = `${CRM_URL}/voices/${voiceRecording.id}?isAdvertisement=true`;

  return (
    <StyledQRVoiceRecordingDialog open={open} onClose={onClose}>
      <Box className="box-dialog">
        <Box className="box-voice-qr">
          <Typography className="qr-title">
            {t('noteQRRecordingVoice')}
          </Typography>
          <Box className="box-voice-info">
            <Avatar
              src={voiceRecording.avatar}
              alt="avatar"
              className="avatar"
            />
            <Box className="box-info-detail">
              <Typography className="name">{voiceRecording.name}</Typography>
              <Typography className="category">
                {getCategoryLabel(voiceRecording?.category?.name)}
              </Typography>
            </Box>
          </Box>
          <Box className="box-qr">
            <Box className="box-qr-img">
              <QRCode
                value={urlToShow}
                size={220}
                renderAs="svg"
                imageSettings={{
                  src: LogoAIVoice,
                  x: null,
                  y: null,
                  height: 40,
                  width: 40,
                }}
              />
            </Box>
            <Box className="box-qr-note">
              <Typography className="qr-note">
                {t('noteQRVoiceCloning')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledQRVoiceRecordingDialog>
  );
};

export default QRVoiceRecordingDialog;

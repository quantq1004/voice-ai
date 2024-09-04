import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import route from '@src/constants/route';
import actions from '@src/redux/actions';
import { VOICE_STATUS } from '@src/constants/voiceCloning';
import { StyledHome } from './index.style';
import VoicesInformation from './VoicesInformation';
import QRVoiceNewDialog from '../QRDialog';
import QRVoiceRecordingDialog from '../QRVoiceRecordingDialog';

const Home = ({ voicesArray }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isCloseProcessingVoice, setIsProcessingVoice] = useState(false);
  const [isCloseVoices, setIsCloseVoices] = useState(false);
  const [voiceRecording, setVoiceRecording] = useState({});
  const [openQRVoiceNewDialog, setOpenQRVoiceNewDialog] = useState(false);
  const [openQRVoiceRecordingDialog, setOpenQRVoiceRecordingDialog] =
    useState(false);
  const [voices, setVoices] = useState(voicesArray);

  const handleCloseProcessingVoices = () => {
    setIsProcessingVoice((prev) => !prev);
  };

  const handleCloseVoices = () => {
    setIsCloseVoices((prev) => !prev);
  };

  const handleClickCreateNewInMobile = () => {
    history.push(route.VOICE_CLONING_CREATE);
  };

  const handleClickContinueRecordInMobile = (voiceId) => {
    history.push(`${route.VOICE_CLONING_VOICES}/${voiceId}`);
  };

  const hasVoiceRecording = voices.find(
    (item) => item.status === VOICE_STATUS.RECORDING,
  );

  const handleOpenQRVoiceRecording = (voiceRecordingId) => {
    const voice = voices.find((item) => item.id === voiceRecordingId);
    setVoiceRecording(voice);
    dispatch(actions.voiceVoiceCloning.addVoice(voice));
    setOpenQRVoiceRecordingDialog(true);
  };

  const handleContinueRecord = (voiceRecordingId) => {
    const hasRecording = !!hasVoiceRecording;
    if (hasRecording) {
      if (isMobile) {
        handleClickContinueRecordInMobile(voiceRecordingId);
        return;
      }
      handleOpenQRVoiceRecording(voiceRecordingId);
    }
  };

  const handleClickGenerateVoice = () => {
    if (isMobile) {
      handleClickCreateNewInMobile();
      return;
    }
    setOpenQRVoiceNewDialog(true);
  };

  const conditionShowVoiceProcessed =
    voices.filter(
      (item) =>
        item.status !== VOICE_STATUS.RECORDING &&
        item.status !== VOICE_STATUS.PROCESSING,
    ).length > 0;

  const conditionShowVoiceProcessing =
    voices.filter(
      (item) =>
        item.status === VOICE_STATUS.RECORDING ||
        item.status === VOICE_STATUS.PROCESSING,
    ).length > 0;

  const handleVoiceInfoChange = (id, newValues) => {
    const updatedVoices = voices.map((voice) =>
      voice.id === id ? { ...voice, ...newValues } : voice,
    );
    setVoices(updatedVoices);

    const updatedVoice = updatedVoices.find((voice) => voice.id === id);
    if (updatedVoice)
      dispatch(actions.voiceVoiceCloning.addVoice(updatedVoice));
  };

  return (
    <>
      {voices.length > 0 && (
        <StyledHome>
          <Box className="box-voices">
            <Box className="box-home-title">
              <Typography className="home-title">{t('voiceList')}</Typography>
              <Button
                color="primary"
                variant="contained"
                className="generate-btn"
                onClick={handleClickGenerateVoice}
              >
                <AddRounded className="add-icon" />
              </Button>
            </Box>
            {conditionShowVoiceProcessing && (
              <VoicesInformation
                boxVoicesName={t('IN_PROGRESS')}
                closeVoices={isCloseProcessingVoice}
                onCloseVoices={handleCloseProcessingVoices}
                voices={voices}
                onContinueRecord={(voiceId) => handleContinueRecord(voiceId)}
                onVoiceInfoChange={handleVoiceInfoChange}
              />
            )}
            {conditionShowVoiceProcessed && (
              <VoicesInformation
                boxVoicesName={t('voiceCloning')}
                closeVoices={isCloseVoices}
                onCloseVoices={handleCloseVoices}
                voices={voices}
                isVoiceStatusDone
                onVoiceInfoChange={handleVoiceInfoChange}
              />
            )}
          </Box>
          <QRVoiceNewDialog
            open={openQRVoiceNewDialog}
            onClose={() => setOpenQRVoiceNewDialog(false)}
          />
          {voiceRecording && (
            <QRVoiceRecordingDialog
              open={openQRVoiceRecordingDialog}
              onClose={() => setOpenQRVoiceRecordingDialog(false)}
            />
          )}
        </StyledHome>
      )}
    </>
  );
};

export default Home;

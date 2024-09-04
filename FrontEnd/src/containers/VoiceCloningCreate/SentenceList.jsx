import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import apis from '@src/apis';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import actions from '@src/redux/actions';
import { AUDIO_STATUS } from '@src/constants/voiceCloning';
import { StyledSentenceList } from './index.style';

const SentenceList = ({ audiosArray, onSelectSentence }) => {
  const dispatch = useDispatch();
  const { voice: voiceRecording } = useSelector(
    (state) => state.voiceVoiceCloning,
  );
  const { t } = useTranslation();
  const { voiceId } = useParams();

  const saveSelectedSentenceToVoice = async (sentence) => {
    if (!sentence) return;

    const voiceDataUpdate = {
      lastSentenceCode: sentence.code,
    };
    const response = await apis.voiceCloning.updateVoiceCloningVoice(
      voiceId,
      voiceDataUpdate,
    );
    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: t('updateVoiceFailed'),
        }),
      );
    } else {
      const updatedVoiceInfo = {
        ...voiceRecording,
        lastSentenceCode: sentence.code,
      };
      dispatch(actions.voiceVoiceCloning.addVoice(updatedVoiceInfo));
    }
  };

  const handleSelectSentence = async (sentence) => {
    await saveSelectedSentenceToVoice(sentence);
    onSelectSentence();
  };

  const audiosShow = useMemo(
    () =>
      audiosArray
        .map((audio) =>
          audio.status === AUDIO_STATUS.REJECTED
            ? { ...audio, status: AUDIO_STATUS.FAILED }
            : audio,
        )
        .filter((audio) => audio.status !== AUDIO_STATUS.APPROVED),
    [audiosArray],
  );

  const renderStyleSentenceBtn = (status) => {
    switch (status) {
      case AUDIO_STATUS.FAILED:
      case AUDIO_STATUS.REJECTED:
        return 'failed';
      case AUDIO_STATUS.IMPROVEMENT_NEEDED:
        return 'improvement-needed';
      case AUDIO_STATUS.PASSED:
        return 'passed';
      default:
        return '';
    }
  };

  return (
    <StyledSentenceList>
      <Box className="box-sentence-list">
        <Typography className="title">{t('sentenceList')}</Typography>
        <Box className="sentences">
          {audiosShow.map((audio, index) => (
            <Button
              className={`sentence-btn ${renderStyleSentenceBtn(
                audio?.status,
              )}`}
              key={audio.id}
              onClick={() => {
                handleSelectSentence(audio?.sentence);
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </StyledSentenceList>
  );
};

export default SentenceList;

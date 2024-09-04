import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Select, Button } from '@mui/material';
import { AUDIO_STATUS, AUDIO_STATUSES } from '@src/constants/voiceCloning';
import { getAudioStatus } from '@src/services/voiceCloning';
import FirstVoiceBoxImg from '@src/assets/images/create-first-voice-box.svg';
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import { StyledGridSentenceButton, StyledMenuItem } from './index.style';

const GridSentenceButton = ({
  open,
  onClose,
  audiosArray,
  currentSentenceIndex,
  onSelectSentence,
  onNextCheckInformation,
}) => {
  const { t } = useTranslation();

  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState('allSentence');
  const [filteredAudios, setFilteredAudios] = useState([]);

  const isSentenceButtonDisabled = (index, audio) =>
    !audio.audioLink && index !== currentSentenceIndex;

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
        return 'disabled';
    }
  };

  const handleStatusFilterChange = (e) =>
    setSelectedStatusFilter(e.target.value);

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

  const setAudiosToShow = () => {
    if (selectedStatusFilter === 'allSentence') {
      setFilteredAudios(
        audiosShow.map((audio, index) => ({ ...audio, originalIndex: index })),
      );
    } else {
      const audios = audiosShow
        .map((audio, index) => ({ ...audio, originalIndex: index }))
        .filter((audio) => audio.status === selectedStatusFilter);
      setFilteredAudios(audios);
    }
  };

  const allSentencesRecored = useMemo(
    () => audiosShow.every((audio) => audio.audioLink),
    [audiosShow],
  );

  useEffect(() => {
    setAudiosToShow();
  }, [selectedStatusFilter, audiosShow]);

  return (
    <StyledGridSentenceButton open={open} onClose={onClose}>
      <Box className="box-dialog">
        <Box className="box-grid-title">
          <Typography className="grid-title">{t('sentenceList')}</Typography>
          <Button onClick={onClose} className="button-close">
            <CloseRounded />
          </Button>
        </Box>
        <Box className="box-sentence-select">
          <Select
            value={selectedStatusFilter}
            onChange={handleStatusFilterChange}
            className="status-select"
            renderValue={(selected) => <>{t(getAudioStatus(selected))}</>}
          >
            {AUDIO_STATUSES.map((item) => (
              <StyledMenuItem
                key={item.label}
                value={item.value}
                label={item.label}
              >
                {t(getAudioStatus(item.label))}
                {selectedStatusFilter === item.value && (
                  <CheckRounded className="check-icon" />
                )}
              </StyledMenuItem>
            ))}
          </Select>
        </Box>
        {filteredAudios.length === 0 ? (
          <img
            src={FirstVoiceBoxImg}
            alt="empty-list"
            className="image-empty"
          />
        ) : (
          <Box className="box-sentence">
            {filteredAudios.map((audio) => (
              <Button
                className={`sentence-btn ${renderStyleSentenceBtn(
                  audio?.status,
                )} ${
                  audio.originalIndex === currentSentenceIndex &&
                  'current-sentence'
                }`}
                key={audio.id}
                onClick={() => {
                  onSelectSentence(audio.originalIndex);
                  onClose();
                }}
                disabled={isSentenceButtonDisabled(audio.originalIndex, audio)}
              >
                {audio.originalIndex + 1}
              </Button>
            ))}
          </Box>
        )}
        <Box className="box-send">
          {allSentencesRecored ? (
            <Button
              className="action-button pending-button"
              onClick={onNextCheckInformation}
              variant="contained"
            >
              {t('sendRequest')}
            </Button>
          ) : (
            <Box className="send" />
          )}
        </Box>
      </Box>
    </StyledGridSentenceButton>
  );
};

export default GridSentenceButton;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Backdrop,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@mui/material';
import {
  CloseRounded,
  PlayArrowRounded,
  PauseRounded,
} from '@mui/icons-material';
import { COLOR } from '@src/styles/color';
import CustomSwitch from '@src/components/Switch';
import { VOICE_STATUS } from '@src/constants/voiceCloning';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import route from '@src/constants/route';
import UnreleasedDialog from './UnreleasedDialog';
import RenameDialog from './RenameDialog';
import { StyledMoreButtonDialogMobile, StyledAudioSlider } from './index.style';

const MoreButtonDialogMobile = ({
  open,
  onClose,
  currentStatus,
  onVoiceInfoChange,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { voice: voiceInfo } = useSelector((state) => state.voiceVoiceCloning);
  const [loading, setLoading] = useState(false);
  const [showRadioButton, setShowRadioButton] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [openUnreleasedDialog, setOpenUnreleasedDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [enableUseNow, setEnableUseNow] = useState(false);
  const [showReleasedNote, setShowReleasedNote] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const voiceProcessing =
    currentStatus === VOICE_STATUS.PROCESSING ||
    currentStatus === VOICE_STATUS.RECORDING;

  const conditionEnableUseNow =
    currentStatus === VOICE_STATUS.PRIVATE_RELEASED ||
    currentStatus === VOICE_STATUS.PUBLIC_RELEASED;

  const conditionShowReleasedNote =
    currentStatus === VOICE_STATUS.PASSED ||
    currentStatus === VOICE_STATUS.UNRELEASED;

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    const response = await apis.voiceCloning.updateVoiceCloningVoice(
      voiceInfo.id,
      { status: newStatus },
    );

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'updateVoiceFailed',
        }),
      );
      setLoading(false);
      return;
    }
    dispatch(
      actions.noti.push({
        severity: 'success',
        message: 'updateVoiceStatusSuccess',
      }),
    );

    setLoading(false);
    onVoiceInfoChange(voiceInfo.id, { status: newStatus });
    setSelectedStatus(newStatus);

    if (
      newStatus === VOICE_STATUS.PRIVATE_RELEASED ||
      newStatus === VOICE_STATUS.PUBLIC_RELEASED
    ) {
      setEnableUseNow(true);
      setShowReleasedNote(false);
    } else {
      setEnableUseNow(false);
      setShowReleasedNote(true);
    }
  };

  const handlePressButtonReleased = async (checked) => {
    if (checked) {
      await handleStatusChange(VOICE_STATUS.PRIVATE_RELEASED);
      setShowRadioButton(true);
    } else {
      onClose();
      setOpenUnreleasedDialog(true);
    }
  };

  const handleRadioChange = (event) => {
    const newStatus = event.target.value;
    handleStatusChange(newStatus);
  };

  const handleCloseUnreleasedDialog = async (confirm) => {
    setOpenUnreleasedDialog(false);
    if (confirm) {
      await handleStatusChange(VOICE_STATUS.UNRELEASED);
      setSelectedStatus(VOICE_STATUS.UNRELEASED);
      setShowRadioButton(false);
    }
  };

  const conditionShowRadioButton =
    currentStatus === VOICE_STATUS.PRIVATE_RELEASED ||
    currentStatus === VOICE_STATUS.PUBLIC_RELEASED;

  const handleOpenRenameDialog = () => {
    setOpenRenameDialog(true);
    onClose();
  };

  const handleToTTSPage = () => {
    history.push(route.TTS);
  };

  const handlePlayAudio = () => {
    setPlayAudio((prev) => !prev);
  };

  const conditionEnablePlayAudio = enableUseNow || showReleasedNote;

  useEffect(() => {
    if (conditionShowRadioButton) {
      setShowRadioButton(true);
      setSelectedStatus(currentStatus);
    } else setShowRadioButton(false);
  }, [currentStatus]);

  useEffect(() => {
    setEnableUseNow(conditionEnableUseNow);
  }, [conditionEnableUseNow]);

  useEffect(() => {
    if (conditionShowReleasedNote) setShowReleasedNote(true);
    else setShowReleasedNote(false);
  }, [currentStatus]);

  return (
    <>
      <StyledMoreButtonDialogMobile open={open} onClose={onClose}>
        <Backdrop sx={{ zIndex: '9999999' }} open={loading}>
          <CircularProgress />
        </Backdrop>
        <Box className="box-dialog">
          <Box className="box-top">
            <Box className="name-locale-info">
              <Typography>{voiceInfo.name}</Typography>
            </Box>
            <CloseRounded onClick={onClose} className="button-close" />
          </Box>
          <Box className="box-center">
            {showReleasedNote && (
              <Typography className="note-released">
                {t('noteReleased')}
              </Typography>
            )}
            <Box className="box-play-audio">
              <IconButton
                onClick={handlePlayAudio}
                className={`button-play ${
                  !conditionEnablePlayAudio ? 'disabled' : ''
                }`}
                disabled={!conditionEnablePlayAudio}
              >
                {playAudio ? <PauseRounded /> : <PlayArrowRounded />}
              </IconButton>
              {!enableUseNow || voiceProcessing ? (
                <StyledAudioSlider
                  value={2}
                  step={1}
                  min={0}
                  disabled={!enableUseNow || voiceProcessing}
                />
              ) : (
                <StyledAudioSlider value={50} step={1} min={0} />
              )}
            </Box>
            <Button
              onClick={handleToTTSPage}
              variant="contained"
              className={`use-now-btn ${
                !enableUseNow || voiceProcessing ? 'disabled' : ''
              }`}
              disabled={!enableUseNow || voiceProcessing}
            >
              {t('useNow')}
            </Button>
            <Box
              className={`box-released ${voiceProcessing ? 'disabled' : ''}`}
            >
              <Box className="released">
                <Typography
                  className={`released-text ${
                    voiceProcessing ? 'disabled' : ''
                  }`}
                >
                  {t('released')}
                </Typography>
                <CustomSwitch
                  checked={showRadioButton}
                  noneCheckedcolor={COLOR.secondary[80]}
                  checkedColor={COLOR.labelBlue}
                  onChange={handlePressButtonReleased}
                  disabled={voiceProcessing}
                />
              </Box>
              {showRadioButton && (
                <RadioGroup
                  aria-labelledby="status-radio-buttons-group"
                  name="status-radio-buttons-group"
                  value={selectedStatus}
                  onChange={handleRadioChange}
                  className="radio-group"
                >
                  <FormControlLabel
                    value={VOICE_STATUS.PRIVATE_RELEASED}
                    control={
                      <Radio
                        checked={
                          selectedStatus === VOICE_STATUS.PRIVATE_RELEASED
                        }
                        className="radio"
                      />
                    }
                    label={t('privateReleased')}
                  />
                  <FormControlLabel
                    value={VOICE_STATUS.PUBLIC_RELEASED}
                    control={
                      <Radio
                        checked={
                          selectedStatus === VOICE_STATUS.PUBLIC_RELEASED
                        }
                        className="radio"
                      />
                    }
                    label={t('publicReleased')}
                  />
                </RadioGroup>
              )}
            </Box>
            <Button className="rename-btn" onClick={handleOpenRenameDialog}>
              {t('rename')}
            </Button>
          </Box>
        </Box>
      </StyledMoreButtonDialogMobile>
      <UnreleasedDialog
        openUnreleasedDialog={openUnreleasedDialog}
        onCloseUnreleasedDialog={handleCloseUnreleasedDialog}
      />
      <RenameDialog
        open={openRenameDialog}
        onClose={() => setOpenRenameDialog(false)}
        onVoiceInfoChange={onVoiceInfoChange}
      />
    </>
  );
};

export default MoreButtonDialogMobile;

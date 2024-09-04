import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Backdrop,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { COLOR } from '@src/styles/color';
import CustomSwitch from '@src/components/Switch';
import { VOICE_STATUS } from '@src/constants/voiceCloning';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import route from '@src/constants/route';
import UnreleasedDialog from './UnreleasedDialog';
import RenameDialog from './RenameDialog';
import { StyledMoreButtonPopoverDesktop, StylePopover } from './index.style';

const MoreButtonPopperDesktop = ({
  id,
  open,
  anchorEl,
  currentStatus,
  onVoiceInfoChange,
  onCloseMoreInDesktop,
  voiceId,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showRadioButton, setShowRadioButton] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [openUnreleasedDialog, setOpenUnreleasedDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [enableUseNow, setEnableUseNow] = useState(false);
  const [showReleasedNote, setShowReleasedNote] = useState(false);

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
    const response = await apis.voiceCloning.updateVoiceCloningVoice(voiceId, {
      status: newStatus,
    });

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
    onVoiceInfoChange(voiceId, { status: newStatus });
    setSelectedStatus(newStatus);

    if (
      newStatus === VOICE_STATUS.PRIVATE_RELEASED ||
      newStatus === VOICE_STATUS.PUBLIC_RELEASED
    ) {
      setEnableUseNow(true);
      setShowReleasedNote(false);
    } else setEnableUseNow(false);
  };

  const handlePressButtonReleased = async (checked) => {
    if (checked) {
      await handleStatusChange(VOICE_STATUS.PRIVATE_RELEASED);
      setShowRadioButton(true);
    } else {
      setOpenUnreleasedDialog(true);
      onCloseMoreInDesktop();
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
    onCloseMoreInDesktop();
  };

  const handleToTTSPage = () => {
    history.push(route.TTS);
  };

  const conditionEnableHearButton = enableUseNow || showReleasedNote;

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
    setShowReleasedNote(conditionShowReleasedNote);
  }, [conditionShowReleasedNote]);

  return (
    <>
      <StylePopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onCloseMoreInDesktop}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledMoreButtonPopoverDesktop>
          <Backdrop sx={{ zIndex: '9999999' }} open={loading}>
            <CircularProgress />
          </Backdrop>
          <Box className="box-content">
            <Box className="box-center">
              {showReleasedNote && (
                <Typography className="note-released">
                  {t('noteReleased')}
                </Typography>
              )}
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
              <Button
                className={`hear-btn ${
                  !conditionEnableHearButton ? 'disabled' : ''
                }`}
                disabled={!conditionEnableHearButton}
              >
                {t('preview')}
              </Button>
              <Button className="rename-btn" onClick={handleOpenRenameDialog}>
                {t('rename')}
              </Button>
            </Box>
          </Box>
        </StyledMoreButtonPopoverDesktop>
      </StylePopover>
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

export default MoreButtonPopperDesktop;

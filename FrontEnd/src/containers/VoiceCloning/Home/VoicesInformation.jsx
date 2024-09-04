import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
import {
  getCategoryLabel,
  getVoiceStatusLabel,
} from '@src/services/voiceCloning';
import actions from '@src/redux/actions';
import { VOICE_STATUS, VOICE_STATUS_COLORS } from '@src/constants/voiceCloning';
import MoreButtonDialogMobile from './MoreButtonDialogMobile';
import { StyledVoicesInformation, StyledChip } from './index.style';
import MoreButtonPopoverDesktop from './MoreButtonPopoverDesktop';

const VoicesInformation = ({
  boxVoicesName,
  closeVoices,
  onCloseVoices,
  voices,
  isVoiceStatusDone = false,
  onContinueRecord,
  onVoiceInfoChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openDialogMobile, setOpenDialogMobile] = useState(false);
  const [currentVoiceStatus, setCurrentVoiceStatus] = useState('');

  const handleOpenDialogMobile = (id) => {
    const voiceInfo = voices.find((voice) => voice.id === id);
    dispatch(actions.voiceVoiceCloning.addVoice(voiceInfo));
    setCurrentVoiceStatus(voiceInfo.status);
    setOpenDialogMobile(true);
  };

  const handleCloseDialogMobile = () => setOpenDialogMobile(false);

  const handlePressMoreButtonMobile = (voiceId) => {
    if (isMobile) handleOpenDialogMobile(voiceId);
  };

  const renderVoiceStatus = (status) => {
    const color = VOICE_STATUS_COLORS[status];
    const label = getVoiceStatusLabel(status);
    if (!color || !label) return '';
    return <StyledChip color={color}>{t(label)}</StyledChip>;
  };

  const VoiceInformation = ({ id, avatar, name, category = {}, status }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const disabledMoreButton =
      status === VOICE_STATUS.SUSPENDED || status === VOICE_STATUS.FAILED;

    const handleClickMoreInDesktop = (event) => {
      const voiceInfo = voices.find((voice) => voice.id === id);
      if (voiceInfo) dispatch(actions.voiceVoiceCloning.addVoice(voiceInfo));

      setAnchorEl(event.currentTarget);
    };

    const handleCloseMoreInDesktop = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;

    const voiceStatusesForProcessing = [
      VOICE_STATUS.PROCESSING,
      VOICE_STATUS.RECORDING,
    ];

    if (
      (isVoiceStatusDone && voiceStatusesForProcessing.includes(status)) ||
      (!isVoiceStatusDone && !voiceStatusesForProcessing.includes(status))
    )
      return null;

    return (
      <Box className="voice">
        <Avatar src={avatar} alt="avatar" className="avatar" />
        <Box className="voice-info">
          <Box className="name-info">
            <Typography className="name">{name}</Typography>
          </Box>
          <Box className="category-info">
            <Typography>{getCategoryLabel(category?.name)}</Typography>
          </Box>
          <Box className="status">
            {status === VOICE_STATUS.RECORDING && (
              <Button
                onClick={() => onContinueRecord(id)}
                className="recording-status-btn"
              >
                <Typography>{t('continue')}</Typography>
              </Button>
            )}
            {status !== VOICE_STATUS.RECORDING && renderVoiceStatus(status)}
          </Box>
        </Box>
        {isMobile && (
          <IconButton
            className={`more-horiz-btn ${disabledMoreButton ? 'disabled' : ''}`}
            onClick={() => handlePressMoreButtonMobile(id)}
            disabled={disabledMoreButton}
          >
            <MoreHorizRounded />
          </IconButton>
        )}
        {!isMobile && (
          <Box>
            <IconButton
              className={`more-horiz-btn ${
                disabledMoreButton ? 'disabled' : ''
              }`}
              aria-describedby={idPopover}
              onClick={handleClickMoreInDesktop}
              disabled={disabledMoreButton}
            >
              <MoreHorizRounded />
            </IconButton>
            <MoreButtonPopoverDesktop
              id={idPopover}
              open={open}
              anchorEl={anchorEl}
              currentStatus={status}
              onVoiceInfoChange={onVoiceInfoChange}
              onCloseMoreInDesktop={handleCloseMoreInDesktop}
              voiceId={id}
              voiceName={name}
            />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <StyledVoicesInformation>
      <Box className="box-title-icon-btn">
        <Typography className="title">{boxVoicesName}</Typography>
        <IconButton className="arrow-icon-btn" onClick={onCloseVoices}>
          {closeVoices ? (
            <KeyboardArrowDownRounded />
          ) : (
            <KeyboardArrowUpRounded />
          )}
        </IconButton>
      </Box>
      {!closeVoices && (
        <Box className="voices">
          {voices.map((item) => (
            <VoiceInformation
              key={item.id}
              id={item.id}
              avatar={item.avatar}
              name={item.name}
              locale={item.locale}
              category={item?.category}
              gender={item.gender}
              status={item.status}
            />
          ))}
        </Box>
      )}
      <MoreButtonDialogMobile
        open={openDialogMobile}
        onClose={handleCloseDialogMobile}
        currentStatus={currentVoiceStatus}
        onVoiceInfoChange={onVoiceInfoChange}
      />
    </StyledVoicesInformation>
  );
};

export default VoicesInformation;

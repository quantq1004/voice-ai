import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import route from '@src/constants/route';
import FirstVoiceBoxImg from '@src/assets/images/new-voice.png';
import { MOBILE_BREAKPOINT } from '@src/constants';
import { StyledFirstVoice } from './index.style';

const FirstVoice = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClickCreateInMobile = () => {
    navigate(route.VOICE_CLONING_CREATE);
  };

  const handleClickCreate = () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      handleClickCreateInMobile();
    }
  };

  return (
    <StyledFirstVoice>
      <Box className="box">
        <img src={FirstVoiceBoxImg} alt="first-voice-box" className="image" />
        <Typography className="text-empty-list">
          {t('emptyVoiceList')}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          className="button"
          onClick={handleClickCreate}
        >
          <AddCircleRounded className="icon" />
          {t('generateVoice')}
        </Button>
      </Box>
    </StyledFirstVoice>
  );
};

export default FirstVoice;

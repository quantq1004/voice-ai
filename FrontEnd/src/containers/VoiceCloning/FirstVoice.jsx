import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import route from '@src/constants/route';
import FirstVoiceBoxImg from '@src/assets/images/new-voice.png';
import { MOBILE_BREAKPOINT } from '@src/constants';
import { StyledFirstVoice } from './index.style';
import QRDialog from './QRDialog';

const FirstVoice = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [openQRDialog, setOpenQRDialog] = useState(false);

  const handleClickCreateInMobile = () => {
    history.push(route.VOICE_CLONING_CREATE);
  };

  const handleClickCreate = () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      handleClickCreateInMobile();
    } else {
      setOpenQRDialog(true);
    }
  };

  const handleCloseQRDialog = () => {
    setOpenQRDialog(false);
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
      <QRDialog open={openQRDialog} onClose={handleCloseQRDialog} />
    </StyledFirstVoice>
  );
};

export default FirstVoice;

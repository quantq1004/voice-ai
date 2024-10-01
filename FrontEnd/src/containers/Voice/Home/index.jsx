import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import route from '@src/constants/route';
import { AddRounded } from '@mui/icons-material';

import { StyledHome } from './index.style';

const Home = ({ voices }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClickGenerateVoice = () => {
    navigate(route.VOICE_CLONING_CREATE);
  };

  return (
    <>
      {voices?.length > 0 && (
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
          </Box>
        </StyledHome>
      )}
    </>
  );
};

export default Home;

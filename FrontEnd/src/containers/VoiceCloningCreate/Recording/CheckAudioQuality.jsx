import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import { StyledCheckAudioQuality } from './index.style';
import { qualities } from '../data/qualities';

const CheckAudioQuality = ({ qualityStates }) => {
  const { t } = useTranslation();

  return (
    <StyledCheckAudioQuality>
      <Box className="box-title">
        <Typography className="evaluate-text">{t('evaluate')}</Typography>
      </Box>
      <Box className="box-quality">
        {qualities.map((item, index) => (
          <Box
            key={item.id}
            className={`box-quality-item ${
              index === qualities.length - 1 ? 'last-item' : ''
            }`}
          >
            {qualityStates[item.id] ? (
              <CheckRounded className="check-icon" />
            ) : (
              <CloseRounded className="close-icon" />
            )}
            <Typography className="quality-text" key={item.id}>
              {t(item.text)}
            </Typography>
          </Box>
        ))}
      </Box>
    </StyledCheckAudioQuality>
  );
};

export default CheckAudioQuality;

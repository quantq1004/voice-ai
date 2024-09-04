import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@mui/material';
import QRVoiceCloningDevImg from '@src/assets/images/qr-create-vc-dev.png';
import QRVoiceCloningUatImg from '@src/assets/images/qr-create-vc-uat.png';
import QRVoiceCloningProdImg from '@src/assets/images/qr-create-vc-prod.png';
import { ENV } from '@src/configs';
import { StyledQRDialog } from './index.style';

const QRDialog = ({ open, onClose }) => {
  const { t } = useTranslation();

  const imagesByEnv = {
    dev: QRVoiceCloningDevImg,
    uat: QRVoiceCloningUatImg,
    prod: QRVoiceCloningProdImg,
  };

  const qrToShow = imagesByEnv[ENV];

  return (
    <StyledQRDialog open={open} onClose={onClose}>
      <Box className="box-dialog">
        <Box className="box-qr-title ">
          <Typography className="qr-title">
            {t('titleQRVoiceCloning')}
          </Typography>
          <Box className="box-qr">
            <Box className="box-qr-beta">
              <Typography className="qr-beta-text">
                {t('featureBetaQRVoiceCloning')}
              </Typography>
            </Box>
            <Box className="box-qr-img">
              <img src={qrToShow} alt="qr-img" className="qr-image" />
            </Box>
            <Box className="box-qr-note">
              <Typography className="qr-note">
                {t('noteQRVoiceCloning')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledQRDialog>
  );
};

export default QRDialog;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Button } from '@mui/material';
import { StyledUnreleasedDialog } from './index.style';

const UnreleasedDialog = ({
  openUnreleasedDialog,
  onCloseUnreleasedDialog,
}) => {
  const { t } = useTranslation();

  return (
    <StyledUnreleasedDialog
      open={openUnreleasedDialog}
      onClose={() => onCloseUnreleasedDialog(false)}
    >
      <Box className="box-dialog">
        <Typography className="title">{t('unreleased')}</Typography>
        <Box className="box-text">
          <Typography className="warning">{t('warningUnreleased')}</Typography>
          <Typography className="note">{t('noteUnreleased')}</Typography>
        </Box>
        <Box className="box-button">
          <Button
            onClick={() => onCloseUnreleasedDialog(true)}
            className="agree"
          >
            {t('agree')}
          </Button>
          <Button
            onClick={() => onCloseUnreleasedDialog(false)}
            variant="contained"
          >
            {t('cancel')}
          </Button>
        </Box>
      </Box>
    </StyledUnreleasedDialog>
  );
};

export default UnreleasedDialog;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button } from '@mui/material';
import {
  KeyboardArrowRightRounded,
  ArrowBackRounded,
} from '@mui/icons-material';
import NoteItem from './NoteItem';
import { StyledNotes } from './index.style';
import { notes } from './data/notes';

const Notes = ({ onPreviousStep, onNextStep }) => {
  const { t } = useTranslation();

  return (
    <StyledNotes>
      <Box className="top">
        <Button className="arrow-button">
          <ArrowBackRounded
            className="arrow-right-icon"
            onClick={onPreviousStep}
          />
        </Button>
        <Typography className="text-note-header">{t('note')}</Typography>
      </Box>
      <Box className="center">
        <Box className="box-center">
          {notes.map((item, index) => (
            <NoteItem
              key={item.id}
              icon={item.icon}
              noteTitle={t(item.title)}
              noteText={t(item.text)}
              isFirst={index === 0}
              isLast={index === notes.length - 1}
            />
          ))}
        </Box>
      </Box>
      <Box className="bottom">
        <Button
          variant="contained"
          className="action-button pending-button"
          onClick={onNextStep}
        >
          {t('startRecording')}
          <KeyboardArrowRightRounded />
        </Button>
      </Box>
    </StyledNotes>
  );
};

export default Notes;

import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledNoteItem } from './index.style';

const NoteItem = ({
  icon,
  noteTitle,
  noteText,
  isFirst = false,
  isLast = false,
}) => (
  <StyledNoteItem>
    <Box
      className={`box-icon-note ${isFirst ? 'first' : ''} ${
        isLast ? 'last' : ''
      }`}
    >
      <Box className="box-icon">
        <img src={icon} alt="icon" />
      </Box>
      <Box className="box-note">
        <Typography className="note-title">{noteTitle}</Typography>
        <Typography className="note-text">{noteText}</Typography>
      </Box>
    </Box>
  </StyledNoteItem>
);

export default NoteItem;

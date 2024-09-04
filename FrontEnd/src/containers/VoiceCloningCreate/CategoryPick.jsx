import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardArrowRightRounded,
  ArrowBackRounded,
} from '@mui/icons-material';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Emoji from 'react-emoji-render';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import { getCategoryLabel } from '@src/services/voiceCloning';
import actions from '@src/redux/actions';
import {
  StyledCategoryPick,
  StyledCategoryList,
  StyledCategoryMethodItem,
} from './index.style';

const CategoryPick = ({ onNextStep, onPreviousStep, hasRecording }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const response = await apis.voiceCloning.getVoiceCloningCategories();

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'getCategoriesFailed',
        }),
      );
      setLoading(false);
      return;
    }
    const categoriesArray = response?.result?.categories || [];
    setCategories(categoriesArray);
    setLoading(false);
  };

  useEffect(() => {
    if (!hasRecording) {
      fetchCategories();
    }
  }, []);

  const handleCategoryPick = (item) => {
    dispatch(actions.category.setSelectedCategory(item));
  };

  return (
    <StyledCategoryPick>
      <Box className="top">
        <Button className="arrow-button">
          <ArrowBackRounded
            className="arrow-right-icon"
            onClick={onPreviousStep}
          />
        </Button>
        <Typography className="text-purpose">
          {t('recordingPurpose')}
        </Typography>
      </Box>
      <div className="center">
        {loading ? (
          <div className="loading">
            <CircularProgress size={45} />
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <StyledCategoryList>
                {categories.map((item) => (
                  <StyledCategoryMethodItem
                    onClick={() => handleCategoryPick(item)}
                    key={item.id}
                    className={
                      category && category.id === item.id ? 'selected' : ''
                    }
                  >
                    <Box className="logo-box">
                      <Emoji
                        onlyEmojiClassName="make-emojis-large"
                        text={item.icon}
                      />
                      <div className="logo-content">
                        {getCategoryLabel(item.name)}
                      </div>
                    </Box>
                  </StyledCategoryMethodItem>
                ))}
              </StyledCategoryList>
            )}
          </>
        )}
        {category && (
          <Box className="bottom">
            <Button
              variant="contained"
              className="action-button pending-button"
              onClick={onNextStep}
            >
              {t('continue')}
              <KeyboardArrowRightRounded />
            </Button>
          </Box>
        )}
      </div>
    </StyledCategoryPick>
  );
};

export default CategoryPick;

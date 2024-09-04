import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import route from '@src/constants/route';
import { uploadFileToS3 } from '@src/services/upload';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Backdrop,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  ArrowBackRounded,
  SearchRounded,
  KeyboardArrowDownRounded,
  EditRounded,
} from '@mui/icons-material';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import AvatarAIVoice from '@src/assets/avatars/avatar-ai-voice.png';
import {
  GENDER,
  VOICE_LOCALES,
  USERNAME_EXISTS,
  MAX_LENGTH_VOICE_NAME,
  MIN_LENGTH_USERNAME,
  MAX_LENGTH_USERNAME,
} from '@src/constants/voiceCloning';
import { nonAccentVietnamese } from '@src/utils/accent';
import {
  REGEX_SPECIAL_CHARACTERS,
  validateLowerCaseSpecialCharacters,
} from '@src/utils/checkValid';
import { StyledAddInformation, StyledProvincesList } from './index.style';

const initialFilter = { search: '', locale: '' };

const AddInformation = ({ onPreviousStep, onNextStep }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(AvatarAIVoice);
  const [avatarFile, setAvatarFile] = useState(null);
  const [locale, setLocale] = useState('');
  const [voiceName, setVoiceName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');
  const { category } = useSelector((state) => state.category);
  const { provinces: provincesStore } = useSelector((state) => state.province);
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [provincesLoading, setProvincesLoading] = useState(false);
  const [openProvinces, setOpenProvinces] = useState(false);
  const [error, setError] = useState({
    voiceName: false,
    username: false,
    gender: false,
    locale: false,
    province: false,
  });

  const VOICE_FIELDS = {
    VOICE_NAME: t('voiceName'),
    USERNAME: t('username'),
    GENDER: t('gender'),
    LOCALE: t('voiceLocale'),
    PROVINCE: t('voiceProvince'),
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const fetchProvinces = async () => {
    setProvincesLoading(true);
    const response = await apis.voiceCloning.getVoiceCloningProvinces({
      search: filter.search.trim(),
      searchFields: 'name,code,locale',
      locale: filter.locale === '' ? undefined : filter.locale,
    });

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'getProvincesFailed',
        }),
      );
      setProvincesLoading(false);
      return;
    }
    // Sort provinces by locale and name
    const sortProvinces = response?.result?.provinces.sort((a, b) => {
      if (a.locale === b.locale) return a.name.localeCompare(b.name);
      return a.locale.localeCompare(b.locale);
    });
    dispatch(actions.province.addProvinces(sortProvinces));
    setProvincesLoading(false);
  };

  const handleChangeSearchFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleChangeLocaleFilter = (newLocale) => {
    setLocale(newLocale);
    setProvince('');
    setFilter({ ...filter, locale: newLocale });
    setError({ ...error, locale: false });
  };

  const handleUploadAvatarToS3 = async (fileName, file) => {
    const extension = fileName.split('.')[1];
    const name = fileName.split('.')[0];
    const directory = 'images/voice-cloning';
    const s3Url = await uploadFileToS3(name, directory, extension, file);

    if (!s3Url) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'uploadError',
        }),
      );
      return null;
    }

    return s3Url;
  };

  const handleChangeVoiceName = (value) => {
    setError({ ...error, voiceName: false, username: false });
    setVoiceName(value);
  };

  const handleChangeUsername = (value) => {
    setError({ ...error, username: false });
    setUsername(value);
  };

  const handleChangeGender = (value) => {
    setError({ ...error, gender: false });
    setGender(value);
  };

  const checkUsername = (value) => {
    if (
      value.trim().length < MIN_LENGTH_USERNAME ||
      value.trim().length > MAX_LENGTH_USERNAME
    ) {
      return {
        username: t('usernameLength', {
          min: MIN_LENGTH_USERNAME,
          max: MAX_LENGTH_USERNAME,
        }),
      };
    }
    if (!validateLowerCaseSpecialCharacters(value)) {
      return { username: t('usernameLowerCaseSpecialCharacters') };
    }
    return { username: false };
  };

  const checkVoicename = (value) => {
    if (value.length > MAX_LENGTH_VOICE_NAME) {
      return {
        voiceName: t('voiceNameLength', { max: MAX_LENGTH_VOICE_NAME }),
      };
    }
    return { voiceName: false };
  };

  const handleSubmitVoice = async () => {
    let newError = error;
    newError = { ...newError, ...checkUsername(username) };
    newError = { ...newError, ...checkVoicename(voiceName) };

    // Check required fields
    const voiceFields = [
      {
        value: voiceName.trim(),
        key: 'voiceName',
        name: VOICE_FIELDS.VOICE_NAME,
      },
      {
        value: username.trim(),
        key: 'username',
        name: VOICE_FIELDS.USERNAME,
      },
      { value: gender, key: 'gender', name: VOICE_FIELDS.GENDER },
      { value: locale, key: 'locale', name: VOICE_FIELDS.LOCALE },
      { value: province, key: 'province', name: VOICE_FIELDS.PROVINCE },
    ];

    // Iterate over the fields and assign error messages to empty ones
    voiceFields.forEach((field) => {
      if (!field.value) {
        newError[field.key] = t('fieldRequired', { field: field.name });
      }
    });

    const isInvalid = Object.values(newError).some((item) => item);
    if (isInvalid) {
      setError(newError);
      return;
    }

    const voiceData = {
      categoryId: category.id,
      name: voiceName.trim(),
      username: username.trim(),
      gender,
      locale,
      provinceId: province.id,
    };

    let avatarLink = null;

    setLoading(true);
    if (voiceName && gender && locale && avatarFile && province) {
      const avatarName = avatarFile.name;
      const ext = avatarName.split('.').pop();
      const imgName = avatarName.slice(0, avatarName.lastIndexOf('.'));
      const link = await handleUploadAvatarToS3(
        `${imgName}_${uuid()}.${ext}`,
        avatarFile,
      );
      avatarLink = link;
    }
    if (avatarLink) voiceData.avatar = avatarLink;

    const response = await apis.voiceCloning.createVoiceCloningVoice(voiceData);
    if (!response?.status) {
      if (response.errorCode === USERNAME_EXISTS) {
        setError({ ...error, username: t('voiceUsernameExistsError') });
        setLoading(false);
        return;
      }
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'createVoiceFailed',
        }),
      );
      setLoading(false);
      return;
    }

    const id = response?.result?.voice?.id;
    history.push(`${route.VOICE_CLONING_VOICES}/${id}`);
    onNextStep();
    setLoading(false);
  };

  const handleOpenProvinces = () => setOpenProvinces(true);

  const handleCloseProvinces = () => setOpenProvinces(false);

  const handleChooseProvince = (item) => () => {
    setProvince(item);
    setOpenProvinces(false);
    setError({ ...error, province: false });
  };

  const renderStyleLocale = (item) => {
    switch (item) {
      case VOICE_LOCALES.NORTHERN:
        return 'northern';
      case VOICE_LOCALES.CENTRAL:
        return 'central';
      case VOICE_LOCALES.SOUTHERN:
        return 'southern';
      default:
        return '';
    }
  };

  // Generate username from voice name without special characters and spaces
  const generateUsername = (name) => {
    const stringNonAccentVietnamese = nonAccentVietnamese(name);
    return stringNonAccentVietnamese
      .replace(REGEX_SPECIAL_CHARACTERS, '')
      .toLowerCase();
  };

  useEffect(() => {
    if (!provincesStore.length) fetchProvinces();
  }, []);

  useEffect(() => {
    if (provincesStore.length) {
      // Filter provinces by locale
      const filteredProvincesByLocale = provincesStore.filter((item) =>
        item.locale.toLowerCase().includes(filter.locale.toLowerCase()),
      );
      // Filter provinces by name or code
      const filteredProvincesBySearch = filteredProvincesByLocale.filter(
        (item) =>
          item.name.toLowerCase().includes(filter.search.toLowerCase()) ||
          item.code.toLowerCase().includes(filter.search.toLowerCase()),
      );
      setProvinces(filteredProvincesBySearch);
    }
  }, [filter, provincesStore]);

  useEffect(() => {
    setUsername(generateUsername(voiceName));
  }, [voiceName]);

  return (
    <StyledAddInformation>
      <Backdrop sx={{ zIndex: '9999999' }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Box className="top">
        <Button className="arrow-button">
          <ArrowBackRounded
            className="arrow-right-icon"
            onClick={onPreviousStep}
          />
        </Button>
        <Typography className="text-note">{t('addInformation')}</Typography>
      </Box>
      <Box className="center">
        <Box className="box-avatar">
          <Box className="avatar">
            <label htmlFor="avatar-input">
              <Avatar alt="Avatar" src={avatar} className="avatar-img" />
              <input
                type="file"
                accept="image/*"
                id="avatar-input"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <Box className="icon-box">
                <EditRounded className="icon" />
              </Box>
            </label>
          </Box>
        </Box>
        <Box className={`voice-name ${error.voiceName && 'border-error'}`}>
          <Typography className="title-field">{t('voiceName')}</Typography>
          <input
            type="text"
            className="text-field-name"
            placeholder={t('inputVoiceName')}
            value={voiceName}
            onChange={(e) => handleChangeVoiceName(e.target.value)}
          />
        </Box>
        {error.voiceName && (
          <Typography className="error-message">{error.voiceName}</Typography>
        )}
        <Box>
          <Box className={`username ${error.username && 'border-error'}`}>
            <Typography className="title-field">{t('username')}</Typography>
            <input
              type="text"
              className="text-field-name"
              value={username}
              placeholder={t('username')}
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
          </Box>
        </Box>
        {error.username && (
          <Typography className="error-message">{error.username}</Typography>
        )}
        <Box className={`gender ${error.gender && 'border-error'}`}>
          <Typography className="title-field">{t('gender')}</Typography>
          <Box className="gender-box-button">
            {GENDER.map((option, index) => (
              <Button
                key={option.label}
                className={`gender-button ${
                  index === 0 ? 'button-right' : 'button-left'
                } ${gender === option.value ? 'selected' : ''}`}
                onClick={() => handleChangeGender(option.value)}
              >
                {t(option.label)}
              </Button>
            ))}
          </Box>
        </Box>
        {error.gender && (
          <Typography className="error-message">{error.gender}</Typography>
        )}
        <Box className={`locale ${error.locale && 'border-error'}`}>
          <Typography className="title-field">{t('voiceLocale')}</Typography>
          <Box className="locale-box-button">
            {Object.values(VOICE_LOCALES).map((value) => (
              <Button
                key={value}
                className={`locale-button ${renderStyleLocale(value)} ${
                  locale === value ? 'selected' : ''
                }`}
                onClick={() => handleChangeLocaleFilter(value)}
              >
                {t(value)}
              </Button>
            ))}
          </Box>
        </Box>
        {error.locale && (
          <Typography className="error-message">{error.locale}</Typography>
        )}
        <Box className={`province ${error.province && 'border-error'}`}>
          <Typography className="title-field">{t('voiceProvince')}</Typography>
          <Button
            onClick={handleOpenProvinces}
            className="province-button"
            disabled={!locale}
          >
            {!province ? (
              <Typography className={`${!locale ? 'disabled' : 'select'}`}>
                {t('selectProvince')}
              </Typography>
            ) : (
              <Typography className="province">{t(province.name)}</Typography>
            )}
            {provincesLoading ? (
              <Box className="loading">
                <CircularProgress size={15} />
              </Box>
            ) : (
              <KeyboardArrowDownRounded className="icon" />
            )}
          </Button>
        </Box>
        {error.province && (
          <Typography className="error-message">{error.province}</Typography>
        )}
      </Box>
      <Box className="bottom">
        <Button
          className="back-button action-button pending-button"
          onClick={onPreviousStep}
        >
          <KeyboardArrowLeftRounded />
          {t('back')}
        </Button>
        <Button
          variant="contained"
          className="action-button pending-button"
          onClick={handleSubmitVoice}
        >
          {t('continue')}
          <KeyboardArrowRightRounded />
        </Button>
      </Box>
      <StyledProvincesList open={openProvinces} onClose={handleCloseProvinces}>
        <Box className="box-dialog">
          <Box className="box-search">
            <TextField
              className="search"
              value={filter.search}
              name="search"
              size="small"
              fullWidth
              placeholder={t('searchVoicePlaceholder')}
              onChange={handleChangeSearchFilter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="provinces">
            {provinces.map((item, index) => (
              <Button
                className={`province ${index === 0 ? 'first' : ''} ${
                  index === provinces.length - 1 ? 'last' : ''
                }`}
                key={item.id}
                onClick={handleChooseProvince(item)}
              >
                {t(item.name)}
              </Button>
            ))}
          </Box>
        </Box>
      </StyledProvincesList>
    </StyledAddInformation>
  );
};

export default AddInformation;

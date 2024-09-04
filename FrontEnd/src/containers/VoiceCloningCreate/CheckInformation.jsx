import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Backdrop,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import {
  KeyboardArrowRightRounded,
  ArrowBackRounded,
  KeyboardArrowDownRounded,
  SearchRounded,
  EditRounded,
} from '@mui/icons-material';
import Emoji from 'react-emoji-render';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import { uploadFileToS3 } from '@src/services/upload';
import { v4 as uuid } from 'uuid';
import { VOICE_LOCALES, USERNAME_EXISTS } from '@src/constants/voiceCloning';
import { getCategoryLabel } from '@src/services/voiceCloning';
import { validateLowerCaseSpecialCharacters } from '@src/utils/checkValid';
import SentenceList from './SentenceList';
import { StyledCheckInformation, StyledProvincesList } from './index.style';

const initialFilter = { search: '', locale: '' };

const CheckInformation = ({
  onPreviousStep,
  onNextStep,
  onSelectSentence,
  voiceRecording,
  audios,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { provinces: provincesStore } = useSelector((state) => state.province);

  const [avatar, setAvatar] = useState(voiceRecording.avatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const [locale, setLocale] = useState(voiceRecording.locale);
  const [voiceName, setVoiceName] = useState(voiceRecording.name);
  const [username, setUsername] = useState(voiceRecording.username);
  const [province, setProvince] = useState(voiceRecording.province);

  const [voiceLoading, setVoiceLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [provincesLoading, setProvincesLoading] = useState(false);
  const [openProvinces, setOpenProvinces] = useState(false);
  let avatarLink = null;
  const [error, setError] = useState({
    voiceName: false,
    username: false,
    province: false,
  });

  const VOICE_FIELDS = {
    VOICE_NAME: t('voiceName'),
    USERNAME: t('username'),
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
      if (a.locale === b.locale) {
        return a.name.localeCompare(b.name);
      }
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

  const checkUsername = (value) => {
    const MAX_LENGTH = 25;
    const MIN_LENGTH = 5;
    if (value.trim().length < MIN_LENGTH || value.trim().length > MAX_LENGTH) {
      return {
        username: t('usernameLength', { min: MIN_LENGTH, max: MAX_LENGTH }),
      };
    }
    if (!validateLowerCaseSpecialCharacters(value)) {
      return { username: t('usernameLowerCaseSpecialCharacters') };
    }
    return { username: false };
  };

  const checkVoicename = (value) => {
    const MAX_LENGTH = 25;
    if (value.length > MAX_LENGTH) {
      return {
        voiceName: t('voiceNameLength', { max: MAX_LENGTH }),
      };
    }
    return { voiceName: false };
  };

  const handleCheckConditionVoiceSubmit = async () => {
    setVoiceLoading(true);
    const response = await apis.voiceCloning.getVoiceCloningVoiceSubmitCheck(
      voiceRecording.id,
    );

    if (!response?.status) {
      if (response.errorCode) {
        dispatch(
          actions.noti.push({
            severity: 'error',
            code: response.errorCode,
          }),
        );
        setVoiceLoading(false);
        return;
      }
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'getCheckSubmitFailed',
        }),
      );
      return;
    }
    setVoiceLoading(false);
    onNextStep();
  };

  const handleSubmitUpdateVoice = async () => {
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
      return false;
    }

    const voiceDataUpdate = {};

    if (locale && voiceRecording.locale !== locale)
      voiceDataUpdate.locale = locale;

    if (province && voiceRecording.province.id !== province.id)
      voiceDataUpdate.provinceId = province.id;

    if (voiceName.trim() !== voiceRecording.name)
      voiceDataUpdate.name = voiceName.trim();

    if (username !== voiceRecording.username)
      voiceDataUpdate.username = username;

    setVoiceLoading(true);
    if (voiceName && locale && avatarFile && province) {
      const avatarName = avatarFile.name;
      const ext = avatarName.split('.').pop();
      const imgName = avatarName.slice(0, avatarName.lastIndexOf('.'));
      const link = await handleUploadAvatarToS3(
        `${imgName}_${uuid()}.${ext}`,
        avatarFile,
      );
      avatarLink = link;
    }
    if (avatarLink) voiceDataUpdate.avatar = avatarLink;

    const response = await apis.voiceCloning.updateVoiceCloningVoice(
      voiceRecording.id,
      voiceDataUpdate,
    );

    if (!response?.status) {
      if (response.errorCode === USERNAME_EXISTS) {
        setError({ ...error, username: t('voiceUsernameExistsError') });
        setVoiceLoading(false);
        return false;
      }
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'updateVoiceFailed',
        }),
      );
      return false;
    }

    const updatedVoiceInfo = {
      ...voiceRecording,
      name: voiceName.trim(),
      username,
      avatar: avatarLink || avatar,
      locale,
      province,
    };
    dispatch(actions.voiceVoiceCloning.addVoice(updatedVoiceInfo));

    return true;
  };

  const hasChange =
    voiceRecording.name !== voiceName.trim() ||
    voiceRecording.username !== username ||
    voiceRecording.province.name !== province.name ||
    voiceRecording.avatar !== avatar ||
    voiceRecording.locale !== locale;

  const handlNextPage = async () => {
    let updateResult = true;

    if (hasChange) updateResult = await handleSubmitUpdateVoice();

    if (updateResult) await handleCheckConditionVoiceSubmit();
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

  useEffect(() => {
    if (!provincesStore.length) fetchProvinces();
  }, []);

  useEffect(() => {
    if (provincesStore.length) {
      // Filter provinces by locale
      const filteredProvincesByLocale = provincesStore.filter((item) =>
        item.locale.toLowerCase().includes(locale),
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

  return (
    <StyledCheckInformation>
      <Backdrop sx={{ zIndex: '9999999' }} open={voiceLoading}>
        <CircularProgress />
      </Backdrop>
      <Box className="top">
        {audios.length > 0 && (
          <Button className="arrow-button">
            <ArrowBackRounded
              className="arrow-right-icon"
              onClick={onPreviousStep}
            />
          </Button>
        )}
        <Typography className="text-note">{t('checkInformation')}</Typography>
      </Box>
      <Box className="center">
        <Box className="box-avatar">
          <Box className="avatar">
            <label htmlFor="avatar-input">
              <Avatar
                alt="Avatar"
                src={avatar || avatarFile}
                className="avatar-img"
              />
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
          <EditRounded className="icon" />
        </Box>
        {error.voiceName && (
          <Typography className="error-message">{error.voiceName}</Typography>
        )}
        <Box className={`username ${error.username && 'border-error'}`}>
          <Typography className="title-field">{t('username')}</Typography>
          <input
            type="text"
            className="text-field-name"
            placeholder={t('username')}
            value={username}
            onChange={(e) => handleChangeUsername(e.target.value)}
          />
          <EditRounded className="icon" />
        </Box>
        {error.username && (
          <Typography className="error-message">{error.username}</Typography>
        )}
        <Box className="gender">
          <Typography className="title-field">{t('gender')}</Typography>
          <Typography className="gender-text">
            {t(voiceRecording.gender)}
          </Typography>
        </Box>
        <Box className="locale">
          <Typography className="title-field">{t('voice')}</Typography>
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
        <Box className={`province ${error.province && 'border-error'}`}>
          <Typography className="title-field">{t('voiceProvince')}</Typography>
          <Button onClick={handleOpenProvinces} className="province-button">
            {!province ? (
              <Typography className="select">{t('selectProvince')}</Typography>
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
        <Box className="box-category">
          <Emoji
            onlyEmojiClassName="make-emojis-large"
            text={`${voiceRecording?.category?.icon}`}
          />
          <Typography className="category-name">
            {getCategoryLabel(voiceRecording?.category?.name)}
          </Typography>
        </Box>
        {audios.length > 0 && (
          <SentenceList
            audiosArray={audios}
            onSelectSentence={onSelectSentence}
          />
        )}
      </Box>
      <Box className="bottom">
        <Button
          variant="contained"
          className="action-button pending-button"
          onClick={handlNextPage}
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
    </StyledCheckInformation>
  );
};

export default CheckInformation;

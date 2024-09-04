import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import apis from '@src/apis';
// import debounce from '@src/utils/debounce';
import { useParams } from 'react-router-dom';
import { uploadAudioLinkToS3 } from '@src/services/upload';
import { CUSTOMER_SUPPORT_PHONE_NUMBER } from '@src/configs';
import {
  AUDIO_TYPE,
  WHITESPACE_REGEX,
  TIME_PER_SYLLABLE,
  MIN_TIME_PER_SENTENCE,
  MIN_AUDIO_DURATION,
  RECORD_INTERVAL,
  RECURSIVE_TIMEOUT,
  PUNCTUATION_REGEX,
} from '@src/constants/voiceCloning';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  ArrowBackRounded,
  AppsRounded,
  VolumeUpRounded,
  MicRounded,
  StopRounded,
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
} from '@mui/icons-material';
import MediaStreamRecorder from 'msr';
import getWavHeaders from 'wav-headers';
import actions from '@src/redux/actions';
import { decodeWAV, toBuffer, toArrayBuffer } from './audio';
import { StyledRecording } from './index.style';
import GridSentenceButton from './ActionButton/GridSentenceButton';
import CheckAudioQuality from './CheckAudioQuality';

const Recording = ({
  onPreviousStep,
  onNextStep,
  sentences,
  voiceRecording,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { voiceId } = useParams();
  const [openGridSentenceDialog, setOpenGridSentenceDialog] = useState(false);

  // record
  const [isRecording, setIsRecording] = useState(false);
  const recordingTimeoutRef = useRef(null);
  const startTime = useRef(null);
  const isFirstRender = useRef(true);
  const recorder = useRef(null);
  const stream = useRef(null);
  const audioBlobs = useRef([]);
  const audioBuffer = useRef(Buffer.from([]));
  const [audioDurationFail, setAudioDurationFail] = useState(false);

  // rehear
  const audioRef = useRef(null);
  const [isRehearing, setIsRehearing] = useState(false);
  const [audioToPlay, setAudioToPlay] = useState('');

  const { audios } = useSelector((state) => state.audioVoiceCloning);
  const [loadingUpdateAudio, setLoadingUpdateAudio] = useState(false);

  // disable button
  const nextSentenceDisabled =
    isRecording || isRehearing || loadingUpdateAudio || !audioToPlay;
  const arrowBackBtndisabled = isRecording || isRehearing || loadingUpdateAudio;
  const gridBtndisabled = isRecording || isRehearing || loadingUpdateAudio;
  const rechearBtnDisabled = isRecording || loadingUpdateAudio || !audioToPlay;
  const recordBtnDisabled = isRehearing || loadingUpdateAudio;

  const getDefaultIndex = () => {
    if (sentences.length === 0) return 0;

    const lastRecordedIndex = sentences.findIndex(
      (sentence) => sentence.code === voiceRecording.lastSentenceCode,
    );
    if (lastRecordedIndex !== -1) return lastRecordedIndex;

    return 0;
  };
  const [currentIndex, setCurrentIndex] = useState(getDefaultIndex());
  const conditionShowQuality =
    audios[currentIndex]?.audioLink &&
    !loadingUpdateAudio &&
    !isRecording &&
    !audioDurationFail;

  const handleOpenGridSentenceDialog = () => {
    setOpenGridSentenceDialog(true);
  };

  const handleCloseGridSentenceDialog = () => {
    setOpenGridSentenceDialog(false);
  };

  const exportAudioBufferToAudio = async (toExportAudioBuffer) => {
    const wavHeader = getWavHeaders({
      channels: 1,
      sampleRate: 48000,
      bitDepth: 16,
    });
    const encodedWav = Buffer.concat([wavHeader, toExportAudioBuffer]);
    const blob = new Blob([toArrayBuffer(encodedWav)], { type: 'audio/wav' });
    return blob;
  };

  const handleUploadAudioToS3 = async (file) => {
    const extension = AUDIO_TYPE.WAV;
    const currentAudioCode = audios[currentIndex]?.sentence?.code;
    const fileName = currentAudioCode;
    const directory = `voice-cloning/voices/${voiceId}`;
    const { error, url: s3Url } = await uploadAudioLinkToS3(
      fileName,
      directory,
      extension,
      file,
    );

    if (error) return null;
    return s3Url;
  };

  const updateAudiosArray = (
    audiosArray,
    audioId,
    newAudioLink,
    newQuality,
    newStatus,
  ) =>
    audiosArray.map((audio) => {
      if (audio.id === audioId) {
        return {
          ...audio,
          audioLink: newAudioLink,
          quality: newQuality,
          status: newStatus,
        };
      }
      return audio;
    });

  const handleUpdateAudio = async (audioLink) => {
    setLoadingUpdateAudio(true);
    const audioS3Url = await handleUploadAudioToS3(audioLink);
    if (!audioS3Url) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: t('systemError', { hotline: CUSTOMER_SUPPORT_PHONE_NUMBER }),
        }),
      );
      setLoadingUpdateAudio(false);
      return;
    }

    const audioId = audios[currentIndex]?.id;
    const response = await apis.voiceCloning.updateVoiceCloningAudio(audioId, {
      audioLink: audioS3Url,
    });
    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'createAudioFailed',
        }),
      );
      setLoadingUpdateAudio(false);
      return;
    }

    const audioCurrent = response?.result?.audio;
    const updatedAudios = updateAudiosArray(
      audios,
      audioId,
      audioCurrent.audioLink,
      audioCurrent.quality,
      audioCurrent.status,
    );
    dispatch(actions.audioVoiceCloning.updateAudios(updatedAudios));

    setLoadingUpdateAudio(false);
  };

  const countSyllables = (text) => {
    const words = text.split(WHITESPACE_REGEX);
    return words.length;
  };

  const calculateRecordTime = () => {
    const text = sentences[currentIndex].originalText.trim();
    const numberOfSyllables = countSyllables(text);
    let recordTime = numberOfSyllables * TIME_PER_SYLLABLE;

    if (recordTime < MIN_TIME_PER_SENTENCE) recordTime = MIN_TIME_PER_SENTENCE;

    return recordTime;
  };

  const stopRecording = async () => {
    if (!recorder.current) return;
    // Clear the timeout
    clearTimeout(recordingTimeoutRef.current);

    // get time stop record
    const endTime = Date.now();

    // calculate record time
    const recordTime = endTime - startTime.current;

    // close stream
    if (recorder.current && stream.current) {
      recorder.current.stop();
      const tracks = stream.current.getTracks();
      tracks.forEach((track) => track.stop());
    }

    recorder.current = null;
    stream.current = null;

    const audioLink = await exportAudioBufferToAudio(audioBuffer.current);

    if (recordTime < MIN_AUDIO_DURATION) {
      setAudioDurationFail(true);
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'audioDurationTooShort',
        }),
      );
    } else {
      setAudioDurationFail(false);
      await handleUpdateAudio(audioLink);
    }

    // reset buffer
    stream.current = null;
    recorder.current = null;
    audioBlobs.current = [];
    audioBuffer.current = Buffer.from([]);
    setIsRecording(false);
  };

  const startRecording = async () => {
    if (recorder.current || isRecording) return;
    setIsRecording(true);

    // get time start record
    startTime.current = Date.now();

    // buffer
    audioBlobs.current = [];
    audioBuffer.current = Buffer.from([]);
    // audio stream
    stream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    // audio stream recorder
    recorder.current = new MediaStreamRecorder(stream.current);
    recorder.current.mimeType = 'audio/wav';
    recorder.current.audioChannels = 1;
    recorder.current.ondataavailable = async (e) => {
      const blobData = e;

      // blobs
      audioBlobs.current.push(blobData);

      // array buffer
      const arrayBufferData = await blobData.arrayBuffer();

      // buffer
      const bufferData = toBuffer(arrayBufferData);
      const decodedWav = decodeWAV(bufferData);
      const headlessBufferData = Buffer.from(decodedWav);
      audioBuffer.current = Buffer.concat([
        audioBuffer.current,
        headlessBufferData,
      ]);
    };
    recorder.current.start(RECORD_INTERVAL);

    // Stop recording after the calculated time has passed
    const recordTimeAllowed = calculateRecordTime();
    recordingTimeoutRef.current = setTimeout(() => {
      stopRecording();
      setIsRecording(false);
    }, recordTimeAllowed);
  };

  const requestMicrophonePermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'microphone',
      });
      // Check if the permission for microphone usage is already granted
      if (permissionStatus.state === 'granted') return true;

      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (err) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'microphonePermissionDenied',
        }),
      );
      return false;
    }
  };

  const stopRecordingRecursive = async () => {
    // Check if recording has started
    if (!recorder.current || !startTime.current) {
      // If not, continue to call the function again until it has started
      setTimeout(stopRecordingRecursive, RECURSIVE_TIMEOUT);
      return;
    }
    // If recording has started, then stop
    await stopRecording();
  };

  const toggleRecording = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    const currentState = isRecording;
    setIsRecording((prev) => !prev);

    if (currentState) await stopRecordingRecursive();
    else await startRecording();
  };

  const toggleRehearing = () => setIsRehearing((prev) => !prev);

  const handlePreviousSentence = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else onPreviousStep();
  };

  const handleNextSentence = () => {
    if (currentIndex < sentences.length - 1) setCurrentIndex(currentIndex + 1);
    else onNextStep();
  };

  const saveCurrentSentenceToVoice = async () => {
    if (currentIndex >= 0 && currentIndex < sentences.length) {
      const currentSentence = sentences[currentIndex];
      const voiceDataUpdate = {
        lastSentenceCode: currentSentence.code,
      };
      const response = await apis.voiceCloning.updateVoiceCloningVoice(
        voiceRecording.id,
        voiceDataUpdate,
      );
      if (!response?.status) {
        dispatch(
          actions.noti.push({
            severity: 'error',
            message: 'updateVoiceFailed',
          }),
        );
      } else {
        const updatedVoiceInfo = {
          ...voiceRecording,
          lastSentenceCode: currentSentence.code,
        };
        dispatch(actions.voiceVoiceCloning.addVoice(updatedVoiceInfo));
      }
    }
  };

  const handleAudioEnd = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    setIsRehearing(false);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveCurrentSentenceToVoice();
    setAudioDurationFail(false);
  }, [currentIndex]);

  useEffect(() => {
    if (audios.length > 0) setAudioToPlay(audios[currentIndex]?.audioLink);
  }, [audios, currentIndex]);

  useEffect(() => {
    if (audioToPlay) audioRef.current.src = audioToPlay;
    if (isRehearing) {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    } else if (audioRef.current) audioRef.current.pause();
  }, [isRehearing]);

  const generateWordBoxes = (sentence) => {
    const words = sentence.originalText.split(' ');
    const boxes = [];

    for (let i = 0; i < words.length; i += 1) {
      let word = words[i];
      let punctuation = '';
      // Check if the word ends with punctuation
      if (PUNCTUATION_REGEX.test(word)) {
        punctuation = word[word.length - 1];
        word = word.slice(0, -1);
      }

      const isBoxWord = sentence.nsws.some((nsw) => nsw.originalText === word);
      const isPunctuationBoxWord = sentence.nsws.some(
        (nsw) => nsw.originalText === punctuation,
      );

      boxes.push(
        <Box key={`${word}-${i}`} display="inline">
          <Box component="span" className={isBoxWord ? 'box-word' : ''}>
            {word}
          </Box>
          {punctuation && (
            <Box
              component="span"
              className={isPunctuationBoxWord ? 'box-word' : ''}
            >
              {punctuation}
            </Box>
          )}{' '}
        </Box>,
      );
    }

    return boxes;
  };

  const ActionRecordButton = ({ icon, text, onClickButton }) => (
    <Button
      className="record-button action-button"
      disabled={recordBtnDisabled || loadingUpdateAudio}
      onClick={onClickButton}
    >
      <Box className={`record-box ${recordBtnDisabled ? 'disabled' : ''}`}>
        {icon}
        {text}
      </Box>
    </Button>
  );

  const RecordButton = () => {
    if (loadingUpdateAudio) {
      return (
        <ActionRecordButton
          icon={<CircularProgress size={25} className="progress" />}
          text={t('processing')}
        />
      );
    }
    if (isRecording) {
      return (
        <ActionRecordButton
          icon={<StopRounded className="record-icon" />}
          text={t('stop')}
          onClickButton={toggleRecording}
        />
      );
    }
    return (
      <ActionRecordButton
        icon={<MicRounded className="record-icon" />}
        text={t('voiceRecord')}
        onClickButton={toggleRecording}
      />
    );
  };

  return (
    <StyledRecording>
      <Box className="top">
        <Button
          className="arrow-button"
          onClick={handlePreviousSentence}
          disabled={arrowBackBtndisabled}
        >
          {currentIndex === 0 ? (
            <ArrowBackRounded
              className={`arrow-right-icon ${
                arrowBackBtndisabled ? 'disabled' : ''
              }`}
            />
          ) : (
            <ArrowBackIosRounded
              className={`arrow-right-icon ${
                arrowBackBtndisabled ? 'disabled' : ''
              }`}
            />
          )}
        </Button>
        <Box className="box-number-sentence">
          <Typography className="current-sentence">
            {currentIndex + 1}
          </Typography>
          <Typography className="total-sentences">
            /{sentences.length}
          </Typography>
        </Box>
        <Button
          className="grid-button"
          onClick={handleOpenGridSentenceDialog}
          disabled={gridBtndisabled}
        >
          <AppsRounded
            className={`grid-button-icon ${gridBtndisabled ? 'disabled' : ''}`}
          />
        </Button>
      </Box>
      <Box className="center">
        {sentences.length > 0 && (
          <Box className="content">
            <Box className="box-text">
              <Box className="text">
                {generateWordBoxes(sentences[currentIndex])}
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem className="divider" />
            {/* nsw stands for nonstandard word */}
            {sentences[currentIndex].nsws.length > 0 && (
              <Box className="box-nsw">
                {sentences[currentIndex].nsws.map((nsw) => (
                  <Box className="box-text-nsw" key={nsw.originalText}>
                    <Typography className="original">
                      {nsw.originalText}
                    </Typography>
                    <Typography className="normalized">
                      {nsw.normalizedText}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
        {conditionShowQuality && (
          <CheckAudioQuality qualityStates={audios[currentIndex].quality} />
        )}
      </Box>
      <Box className="bottom">
        <Button
          onClick={toggleRehearing}
          className="rehear-button action-button pending-button"
          disabled={rechearBtnDisabled}
        >
          {isRehearing ? (
            <Box className={`rehear-box ${isRecording ? 'disabled' : ''}`}>
              <StopRounded className="rehear-icon" />
              {t('stop')}
            </Box>
          ) : (
            <Box
              className={`rehear-box ${rechearBtnDisabled ? 'disabled' : ''}`}
            >
              <VolumeUpRounded className="rehear-icon" />
              {t('rehear')}
            </Box>
          )}
        </Button>
        {RecordButton()}
        <Button
          className="next-sentence-button action-button pending-button"
          onClick={handleNextSentence}
          disabled={nextSentenceDisabled}
        >
          <Box
            className={`next-sentence-box ${
              nextSentenceDisabled ? 'disabled' : ''
            }`}
          >
            <ArrowForwardIosRounded className="next-sentence-icon" />
            {currentIndex === sentences.length - 1
              ? t('finished')
              : t('nextSentence')}
          </Box>
        </Button>
      </Box>
      {sentences.length > 0 && (
        <GridSentenceButton
          open={openGridSentenceDialog}
          onClose={handleCloseGridSentenceDialog}
          audiosArray={audios}
          currentSentenceIndex={currentIndex}
          onSelectSentence={(index) => {
            setCurrentIndex(index);
          }}
          onNextCheckInformation={onNextStep}
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={handleAudioEnd}>
        <source src={audioToPlay} type="audio/wav" />
      </audio>
    </StyledRecording>
  );
};

export default Recording;

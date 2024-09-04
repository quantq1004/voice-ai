import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import route from '@src/constants/route';
import { AUDIO_STATUS } from '@src/constants/voiceCloning';
import CategoryPick from './CategoryPick';
import AddInformation from './AddInformation';
import Notes from './Notes';
import Recording from './Recording';
import CheckInformation from './CheckInformation';
import SendRequest from './SendRequest';

const VOICE_CLONING_STEP = {
  SELECT_CATEGORY: 1,
  ADD_INFOMATION: 2,
  NOTES: 3,
  RECORDING: 4,
  CHECK_INFORMATION: 5,
  SEND_REQUEST: 6,
};

const VoiceCloningCreate = () => {
  const history = useHistory();
  const { voiceId } = useParams();
  const dispatch = useDispatch();
  const { audios } = useSelector((state) => state.audioVoiceCloning);
  const { voice: voiceRecording } = useSelector(
    (state) => state.voiceVoiceCloning,
  );
  const [hasRecording, setHasRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audiosCurrent, setAudiosCurrent] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [step, setStep] = useState(null);

  const fetchVoice = async (id) => {
    setIsLoading(true);
    const response = await apis.voiceCloning.getVoiceCloningVoice(id);

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'getVoiceFailed',
        }),
      );
      setIsLoading(false);
      return;
    }
    const recording = response?.result?.voice;
    dispatch(actions.voiceVoiceCloning.addVoice(recording));
    setHasRecording(!!recording);
    setIsLoading(false);
  };

  const fetchAudios = async () => {
    setIsLoading(true);
    const response = await apis.voiceCloning.getVoiceCloningAudios(
      voiceRecording.id,
    );

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'getAudiosFailed',
        }),
      );
      setIsLoading(false);
      return;
    }
    const audiosArray = response?.result?.audios || [];
    const audiosShowed = audiosArray.filter(
      (audio) => audio.status !== AUDIO_STATUS.APPROVED,
    );
    setAudiosCurrent(audiosShowed);

    const sentencesArray = audiosShowed.map((audio) => audio.sentence);
    setSentences(sentencesArray);
    setIsLoading(false);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
    else history.goBack();
  };

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);

  const handleSelectSentence = async () => setStep((prevStep) => prevStep - 1);

  const handleNextFromNotes = async () => {
    await fetchAudios();
    setStep((prevStep) => prevStep + 1);
  };

  const handleBackFromNotes = () => {
    if (hasRecording) {
      history.push(route.VOICE_CLONING_VOICES);
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleNextFromSendRequest = async () =>
    history.push(route.VOICE_CLONING_VOICES);

  const getDefaultStep = () => {
    if (voiceId) return VOICE_CLONING_STEP.NOTES;

    return VOICE_CLONING_STEP.SELECT_CATEGORY;
  };

  useEffect(() => {
    if (voiceId) fetchVoice(voiceId);
  }, [voiceId]);

  useEffect(() => {
    setStep(getDefaultStep());
  }, [voiceId]);

  useEffect(() => {
    dispatch(actions.audioVoiceCloning.updateAudios(audiosCurrent));
  }, [audiosCurrent]);

  useEffect(() => {
    if (!voiceRecording) fetchVoice();
  }, []);

  const renderStepComponent = (currentStep) => {
    switch (currentStep) {
      case VOICE_CLONING_STEP.SELECT_CATEGORY:
        return (
          <CategoryPick
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
            hasRecording={voiceId}
          />
        );
      case VOICE_CLONING_STEP.ADD_INFOMATION:
        return (
          <AddInformation
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
          />
        );
      case VOICE_CLONING_STEP.NOTES:
        return (
          <Notes
            onNextStep={handleNextFromNotes}
            onPreviousStep={handleBackFromNotes}
          />
        );
      case VOICE_CLONING_STEP.RECORDING:
        return (
          <Recording
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
            voiceRecording={voiceRecording}
            sentences={sentences}
          />
        );
      case VOICE_CLONING_STEP.CHECK_INFORMATION:
        return (
          <CheckInformation
            onNextStep={handleNextStep}
            onPreviousStep={handlePreviousStep}
            onSelectSentence={handleSelectSentence}
            voiceRecording={voiceRecording}
            audios={audios}
          />
        );
      case VOICE_CLONING_STEP.SEND_REQUEST:
        return (
          <SendRequest
            onNextStep={handleNextFromSendRequest}
            onPreviousStep={handlePreviousStep}
            voiceRecording={voiceRecording}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          height="90vh"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        !isLoading && renderStepComponent(step)
      )}
    </>
  );
};

export default VoiceCloningCreate;

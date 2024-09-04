import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import FirstVoice from './FirstVoice';
import Home from './Home';
import { StyledVoiceCloning } from './index.style';

const VoiceCloning = () => {
  const dispatch = useDispatch();
  const [voices, setVoices] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVoices = async () => {
    setLoading(true);
    const response = await apis.voiceCloning.getVoiceCloningVoices();

    if (!response?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'getVoicesFailed',
        }),
      );
      setLoading(false);
      return;
    }
    const voicesArray = response?.result?.voices || [];
    setVoices(voicesArray);
    setTotal(response?.result?.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  return (
    <StyledVoiceCloning>
      {loading && (
        <div className="loading">
          <CircularProgress size={45} />
        </div>
      )}
      {!loading &&
        (total === 0 ? <FirstVoice /> : <Home voicesArray={voices} />)}
    </StyledVoiceCloning>
  );
};

export default VoiceCloning;

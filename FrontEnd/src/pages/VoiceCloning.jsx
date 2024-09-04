import React from 'react';
import { useSelector } from 'react-redux';
import { FEATURE_KEYS } from '@src/configs/featureKeys';
import useFeatureFlags from '@src/hooks/useFeatureFlags';

import VoiceCloningContainer from '@src/containers/VoiceCloning';

const VoiceCloning = () => {
  const user = useSelector((state) => state.auth.user);
  const { getFeatureValue } = useFeatureFlags();
  const showVoiceCloning = getFeatureValue(FEATURE_KEYS.VOICE_CLONING, {
    userId: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  if (showVoiceCloning) {
    return <VoiceCloningContainer />;
  }
  return null;
};

export default VoiceCloning;

import React from 'react';
import { useSelector } from 'react-redux';
import { FEATURE_KEYS } from '@src/configs/featureKeys';
import useFeatureFlags from '@src/hooks/useFeatureFlags';

import VoiceCloningCreateContainer from '@src/containers/VoiceCloningCreate';

const VoiceCloningCreate = () => {
  const user = useSelector((state) => state.auth.user);
  const { getFeatureValue } = useFeatureFlags();
  const showVoiceCloningCreate = getFeatureValue(FEATURE_KEYS.VOICE_CLONING, {
    userId: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  if (showVoiceCloningCreate) {
    return <VoiceCloningCreateContainer />;
  }
  return null;
};

export default VoiceCloningCreate;

import category, { initialState as categoryState } from './category/reducer';
import audioVoiceCloning, {
  initialState as audioVoiceCloningState,
} from './audioVoiceCloning/reducer';
import province, { initialState as provinceState } from './province/reducer';
import voiceVoiceCloning, {
  initialState as voiceVoiceCloningState,
} from './voiceVoiceCloning/reducer';

export const initialState = {
  category: categoryState,
  audioVoiceCloning: audioVoiceCloningState,
  province: provinceState,
  voiceVoiceCloning: voiceVoiceCloningState,
};

export default combineReducers({
  category,
  audioVoiceCloning,
  province,
  voiceVoiceCloning,
});

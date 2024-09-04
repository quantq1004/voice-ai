import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import userSagas from './user/sagas';
import featureFlagSagas from './featureFlag/sagas';
import languageSagas from './language/sagas';
import voiceSagas from './voice/sagas';

function* rootSaga() {
  yield all([
    authSagas(),
    userSagas(),
    featureFlagSagas(),
    languageSagas(),
    voiceSagas(),
  ]);
}

export default rootSaga;

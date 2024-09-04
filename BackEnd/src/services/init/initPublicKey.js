const callApi = require('../../utils/callApi');

const { IAM_URL, IAM_REALM } = require('../../configs');

const initPublicKey = async () => {
  let { publicKey } = await callApi({
    method: 'GET',
    url: `${IAM_URL}/auth/realms/${IAM_REALM}`,
  });

  publicKey = `-----BEGIN PUBLIC KEY-----\r\n${publicKey}\r\n-----END PUBLIC KEY-----`;
  global.IAM_PUBLIC_KEY = publicKey;
};

initPublicKey();

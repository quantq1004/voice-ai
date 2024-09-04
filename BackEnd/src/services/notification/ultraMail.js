const ejs = require('ejs');
const CustomError = require('../../errors/CustomError');
const errorCodes = require('../../errors/code');
const callApi = require('../../utils/callApi');
const { NOTIFICATION_URL } = require('../../configs');
const { EMAIL_TYPE, EMAIL_SUBJECT, VOICE_STATUS } = require('../../constants');
const { getTemplatePath, TEMPLATE } = require('./emailTemplates');

const sendUltraMailer = async ({ voiceName, email, status }) => {
  try {
    let subject;
    let templateName;

    switch (status) {
      case VOICE_STATUS.PASSED:
        subject = EMAIL_SUBJECT.PASSED;
        templateName = TEMPLATE.NOTIFY_VOICE_PASSED;
        break;
      case VOICE_STATUS.FAILED:
        subject = EMAIL_SUBJECT.FAILED;
        templateName = TEMPLATE.NOTIFY_VOICE_FAILED;
        break;
      case VOICE_STATUS.SUSPENDED:
        subject = EMAIL_SUBJECT.SUSPENDED;
        templateName = TEMPLATE.NOTIFY_VOICE_SUSPENDED;
        break;
      case VOICE_STATUS.RECORDING:
        subject = EMAIL_SUBJECT.RECORDING;
        templateName = TEMPLATE.NOTIFY_VOICE_RECORDING;
        break;
      default:
        throw new CustomError(errorCodes.INVALID_VOICE_STATUS);
    }

    const template = getTemplatePath(templateName);

    const emailData = {
      type: EMAIL_TYPE[status.toUpperCase()],
      productLogo: 'https://frontend.vbee.vn/images/logo/aivoice.png',
      productName: 'VBEE AIVoice Studio',
      voiceName,
      email,
    };

    const html = await ejs.renderFile(template, emailData, { async: true });

    const payload = {
      to: email,
      from: 'Vbee',
      subject,
      html,
    };

    const sendMail = await callApi({
      method: 'POST',
      url: `${NOTIFICATION_URL}/api/v1/mail/send-mail`,
      data: payload,
    });

    return !sendMail?.error ?? false;
  } catch (error) {
    logger.error(error, { ctx: 'UltraMailer' });
    return null;
  }
};

module.exports = { sendUltraMailer };

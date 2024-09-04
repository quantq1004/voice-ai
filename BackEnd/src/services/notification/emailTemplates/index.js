const TEMPLATE = {
  NOTIFY_VOICE_PASSED: 'notifyVoicePassed',
  NOTIFY_VOICE_FAILED: 'notifyVoiceFailed',
  NOTIFY_VOICE_RECORDING: 'notifyVoiceRecording',
  NOTIFY_VOICE_SUSPENDED: 'notifyVoiceSuspended',
};

const getTemplatePath = (templateName) => {
  switch (templateName) {
    case TEMPLATE.NOTIFY_VOICE_PASSED:
      return `${__dirname}/notifyVoicePassed.ejs`;
    case TEMPLATE.NOTIFY_VOICE_FAILED:
      return `${__dirname}/notifyVoiceFailed.ejs`;
    case TEMPLATE.NOTIFY_VOICE_RECORDING:
      return `${__dirname}/notifyVoiceRecording.ejs`;
    case TEMPLATE.NOTIFY_VOICE_SUSPENDED:
      return `${__dirname}/notifyVoiceSuspended.ejs`;
    default:
      return '';
  }
};

module.exports = {
  TEMPLATE,
  getTemplatePath,
};

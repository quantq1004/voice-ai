require('dotenv').config();
const AWS = require('aws-sdk');
const { LAMBDA_FUNCTION_TIMEOUT } = require('../constants');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  LAMBDA_FUNCTION_NAME,
} = require('../configs');

const getLambda = async () => {
  const lambda = new AWS.Lambda({
    correctClockSkew: true,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION,
    httpOptions: { timeout: LAMBDA_FUNCTION_TIMEOUT },
  });

  return lambda;
};

const invokeLambdaFunction = async ({ payload }) => {
  const lambda = await getLambda({ region: AWS_REGION });
  const params = {
    FunctionName: LAMBDA_FUNCTION_NAME,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload),
  };

  // Invoke the Lambda function and return the response
  try {
    const data = await lambda.invoke(params).promise();
    logger.info(data, { ctx: 'InvokedLambdaFunction' });
    return JSON.parse(data.Payload);
  } catch (error) {
    logger.error(error, { ctx: 'InvokeLambdaFunction' });
    throw error;
  }
};

module.exports = { invokeLambdaFunction };

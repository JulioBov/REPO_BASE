import { defaultProvider } from '@aws-sdk/credential-provider-node';
import aws from 'aws-sdk';
import enviroments from '../enviroments.js';


export const sendSMS = (phone, message) => {
  const sns = new aws.SNS({
    region: enviroments.AWS_REGION,
    defaultProvider
  });

  const params = {
    Message: message,
    PhoneNumber: phone
  };
  
  return sns.publish(params).promise();
};

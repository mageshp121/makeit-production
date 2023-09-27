
import fast2sms from 'fast-two-sms';

import dotenv from 'dotenv';
dotenv.config()

dotenv.config();

const SMSKEY = process.env.FATS_SMS || "XAOvuqZyenj7jQBclfu0245ecZq3PgvTCd2NUE31TfaQwUVUgJti3honk5h1"
const generateOTP = (otp_length) => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};


const sendFast2SMS = async (message, contactNumber) => {
  console.log(message);
  console.log(contactNumber);
  try {
    const response = await fast2sms.sendMessage({
      authorization:'XAOvuqZyenj7jQBclfu0245ecZq3PgvTCd2NUE31TfaQwUVUgJti3honk5h1',
      message: String(message),
      numbers: [contactNumber],
    });
    console.log(response, 'jksjksjd');
  } catch (error) {
    console.log(error, 'asaasasa');
  }
};

sendFast2SMS('your otp 12134', '8590628664');





const Africastalking = require('africastalking');

const AT = Africastalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

module.exports = {
  payments: AT.PAYMENTS,
  sms: AT.SMS,
};

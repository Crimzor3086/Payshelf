const Africastalking = require('africastalking');

const AT = Africastalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

const sms = AT.SMS;

async function sendLowStockSMS(phone, productName, quantity) {
  const message = `⚠️ PayShelf Alert: ${productName} stock is low (${quantity} left). Please restock.`;

  await sms.send({
    to: phone,
    message
  });
}

module.exports = {
  payments: AT.PAYMENTS,
  sms: AT.SMS,
  sendLowStockSMS
};

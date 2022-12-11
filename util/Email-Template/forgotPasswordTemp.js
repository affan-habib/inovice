module.exports = (
  userName,
  token
) => `<div style="background: url(https://ci6.googleusercontent.com/proxy/ql83XJ9oLXv_1MgTWkzlBGmVr-Jdc4KxOzmycb4GNbj1ie38oOvcENkZjZS1Di59J4wTcnWP8-fLBNtdnHVYuSnmQGPOpacnZoN7m1qVYarR72U=s0-d-e1-ft#https://static0.twilio.com/resources/images/email/background.jpg); padding: 30px; border-radius: 5px">
  <div style="background:#FFFFFF; padding: 15px">
  <h1>Hey ${userName},</h1>
  <h4 style="font-weight: 700">A request has been received to change the password for your GreenValleyGrocery account.</h4>
  <div style="margin: 20px 0px">
  <a target="_blank" style="padding: 8px 15px; color: white; text-decoration: none; background: #76C227;" href="${process.env.CLIENT_URL}/user/forgot_password/${token}">Reset Password</a>
  </div>
  <div style="margin: 10px 0px;">
    <h4 style="font-weight: 700;">Thank you</h4>
    <h4 style="font-weight: 700;">The GreenVellayGrocery Team</h4>
  </div>
  <p style="font-style: italic">This link will expire in 60 minutes</p>
  </div>
  </div>
  `;

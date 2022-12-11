module.exports = (
  userName,
  token
) => `<div style="background: url(https://ci6.googleusercontent.com/proxy/ql83XJ9oLXv_1MgTWkzlBGmVr-Jdc4KxOzmycb4GNbj1ie38oOvcENkZjZS1Di59J4wTcnWP8-fLBNtdnHVYuSnmQGPOpacnZoN7m1qVYarR72U=s0-d-e1-ft#https://static0.twilio.com/resources/images/email/background.jpg); padding: 30px; border-radius: 5px">
<div style="background:#FFFFFF; padding: 15px">
<h1>Hi ${userName},</h1>
<p>We're happy you signed up for <a href="${process.env.CLIENT_URL}">greenvalleygrocery.com</a>. To start exploring the GreenVallleyGrocery website and neighborhood. <br/></p>
<h3>Please activate your account.</h3>
<div style="margin: 20px 0px">
<a target="_blank" style="padding: 8px 15px; color: white; text-decoration: none; background: #76C227;" href="${process.env.CLIENT_URL}/user/email_verify/${token}">Activate Account</a>
</div>
or activation link copy and paste another browser
<div>
  <a target="_blank" href="${process.env.CLIENT_URL}/user/email_verify/${token}">${process.env.CLIENT_URL}/user/email_verify/${token}</a>
</div>
<div style="margin: 10px 0px;">
  <h2>Welcome to GreenValleyGrocery</h2>
  <h4 style="font-weight: 700; margin-top: -16px !important">The Green Vellay Grocery Team</h4>
</div>
<p style="font-style: italic">This activation link will expire in 24 hours</p>
</div>
</div>
`;

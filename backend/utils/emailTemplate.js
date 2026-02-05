import "dotenv/config"

export const emailTemplate = (receiverFullName)=>{

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">

        <!-- Logo -->
        <div style="text-align:center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="Relay Logo" style="max-height: 80px;">
        </div>

        <!-- Heading -->
        <h1 style="text-align: center; color: #333;">Welcome to Relay (Chat App)</h1>

        <!-- Greeting -->
        <p style="font-size: 16px; color: #555; line-height: 1.5;">
          Hello ${receiverFullName},<br>
          We’re excited to have you on board! Start connecting with your friends right away.
        </p>

        <!-- Button -->
        <div style="text-align:center; margin-top: 30px;">
          <a href="${process.env.RESEND_WEBSITE_URL}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">Get Started</a>
        </div>

        <!-- Footer -->
        <p style="font-size: 12px; color: #999; text-align:center; margin-top: 40px;">
          &copy; ${new Date().getFullYear()} Relay. All rights reserved.
        </p>
      </div>
    `;



}
// Rejection email template
const rejectionEmailTemplate = (complianceName, note) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; }
          .highlight { color: #dc3545; font-weight: bold; }
          .note-box { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Compliance Document Update</h2>
          </div>
          <div class="content">
            <p>Dear Student,</p>
            
            <p>We have reviewed your submission for <b>${complianceName}</b> compliance document.</p>
            
            <p>We regret to inform you that your document has been <span class="highlight">rejected</span> for the following reason:</p>
            
            <div class="note-box">
              ${note || "No specific reason provided. Please contact the compliance office for more details."}
            </div>
            
            <p>Please make the necessary corrections and resubmit your document at your earliest convenience.</p>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>
            Compliance Department</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  // Completion email template
  const completionEmailTemplate = (complianceName) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; }
          .success { color: #28a745; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Compliance Document Update</h2>
          </div>
          <div class="content">
            <p>Dear Student,</p>
            
            <p>We are pleased to inform you that your submission for <b>${complianceName}</b> compliance document has been <span class="success">completed</span> and approved.</p>
            
            <p>No further action is required from you regarding this document.</p>
            
            <p>Thank you for your prompt submission and cooperation with our compliance requirements.</p>
            
            <p>If you have any questions or need assistance with other compliance matters, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>
            Compliance Department</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

const welcomeStudentEmailTemplate = (studentName, studentEmail, password) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to I2IT College</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                background-color: #2c5aa0;
                color: white;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                margin: -30px -30px 30px -30px;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
            }
            .content {
                padding: 20px 0;
            }
            .welcome-message {
                background-color: #e8f4fd;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #2c5aa0;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #2c5aa0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to I2IT College!</h1>
            </div>
            
            <div class="content">
                <h2>Dear ${studentName},</h2>
                
                <div class="welcome-message">
                    <p><strong>Congratulations!</strong> You have been successfully registered as a student at I2IT College.</p>
                </div>
                
                <p>We are delighted to welcome you to our academic community. Your journey with us begins now, and we're here to support you every step of the way.</p>

                <h3>Your Credentials</h3>
                    <strong>Email :</strong> ${studentEmail} <br>
                    <strong>Password :</strong> ${password}
                <p>If you have any questions or need assistance, please don't hesitate to contact our administrative team.</p>
                
                <p>We look forward to seeing you achieve great things during your time at I2IT College!</p>
                
                <p>Best regards,<br>
                <strong>I2IT College Administration Team</strong></p>
            </div>
            
            <div class="footer">
                <div class="logo">I2IT College</div>
                <p>This email was sent by the I2IT College Administration Team</p>
            </div>
        </div>
    </body>
    </html>
  `;
};


  module.exports = {
    rejectionEmailTemplate,
    completionEmailTemplate,
    welcomeStudentEmailTemplate
  };
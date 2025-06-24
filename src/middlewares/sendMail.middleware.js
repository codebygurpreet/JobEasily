import nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
        user: "gurri304@gmail.com",
        pass: "zgcp jryo kfyd nxdk",
    },
});

// Wrap in an async IIFE so we can use await.
export const sendMailConfirmation = async (applicantData) => {
    try {
        const info = await transporter.sendMail({
            from: 'Gurpreet Singh',
            to: applicantData.email,
            subject: "Job Application Received",
            html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    
                <h2 style="color: #2c3e50; margin-bottom: 10px;">Thank You for Applying!</h2>
    
                <p style="font-size: 16px; color: #444;">
      Hi <strong>${applicantData.name}</strong>,
                </p>
    
                <p style="font-size: 15px; color: #666; line-height: 1.6;">
                We appreciate your interest in joining us. Our team has received your application and will review it shortly. You’ll hear from us soon regarding the next steps.
                </p>

                <div style="margin: 25px 0; padding: 20px; background-color: #f9fafb; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #34495e; font-size: 16px;">📄 Application Summary</h3>
                <p style="margin: 8px 0;"><strong>Name:</strong> ${applicantData.name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${applicantData.email}</p>
                <p style="margin: 8px 0;"><strong>Resume Filename:</strong> ${applicantData.resumePath}</p>
            </div>

            <p style="font-size: 14px; color: #888;">
            If you have any questions or updates, feel free to reply to this email.
            </p>

            <p style="margin-top: 30px; font-size: 14px; color: #999;">
            Best regards,<br>
            <strong>Gurpreet Singh</strong><br>
            Job Portal Team
            </p>

            </div>
            </div>`, // HTML body
        });

        console.log("Message sent:", info.messageId);
        return info;
    } catch (err) {
        console.error("Failed to send email:", err);
        throw err;
    }
};


import nodemailer from 'nodemailer';


const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        servics : 'gmail',
        auth: {
            user: process.env.Email,
            pass : process.env.Email_Pass,
        }
    });
    await transporter.sendMail ({
        from : process.env.Email,
        to,
        subject,
        text,
    });
   
};
export default sendEmail;

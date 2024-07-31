import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Завантаження змінних середовища з файлу .env
dotenv.config();

const { SENDGRID_API_KEY } = process.env;
if (!SENDGRID_API_KEY) {
  throw new Error(
    'SENDGRID_API_KEY is not defined in the environment variables'
  );
}
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'a.nebesnyi@gmail.com' };
  await sgMail.send(email);
  return true;
};

export default sendEmail;

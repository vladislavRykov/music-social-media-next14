import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type sendEmail = {
  to: string;
  token: string;
  title: string;
  confirmationLink: string;
};

export async function sendEmail({ to, token, title, confirmationLink }: sendEmail) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: title,
      html: `<p>Нажми <a href="${confirmationLink}">сюда</a>, чтобы подтвердить свою почту</p>`,
    });

    if (error) {
      return { ok: false, message: 'Ошибка при отправке кода на email' };
    }

    return { ok: true, message: 'email was sent' };
  } catch (error) {
    return { ok: false, message: 'Ошибка при отправке кода на email.' };
  }
}

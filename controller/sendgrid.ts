import { sgMail } from "lib/sendgrid";

export async function sendMail(email: string, code) {
  const msg = {
    to: email,
    from: "cgovi66@gmail.com", // Use the email address or domain you verified above
    subject: "te enviamos el codigo de inicio de sesion",
    html:
      "<strong>El codigo de inicio de sesion para la plataforma es : " +
      code +
      "</strong>",
  };
  // html:
  //   "<strong>El codigo de inicio de sesion para la plataforma es : " +
  //   code +
  //   "</strong>",

  try {
    await sgMail.send(msg);
    return console.log("send Email");
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}

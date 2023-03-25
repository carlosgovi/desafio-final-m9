import { sgMail } from "lib/sendgrid";

export async function sendEMail(email: string, code) {
  const msg = {
    to: email,
    from: "cgovi66@gmail.com", // Use the email address or domain you verified above
    subject: "te enviamos el codigo de inicio de sesion",
    html:
      "<strong>El codigo de inicio de sesion para la plataforma es : " +
      code +
      "</strong>",
  };

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
export async function sendEmailToSeller(
  emailVendedor: string,
  emailComprador: string,
  dataOrder: any
) {
  const msg = {
    to: emailVendedor,
    from: emailVendedor, // Use the email address or domain you verified above
    subject: "ocurrio una venta",
    html: `<strong>
    La compra la hizo: ${emailComprador} 
    <br>
    El producto :
    <br>
    <ul>
     <li> Titulo:  ${dataOrder.title}</li>
     <li> Img:  ${dataOrder.picture_url}</li>
     <li> Cantidad:  ${dataOrder.quantity}</li>
     <li> Precio:  ${dataOrder.unit_price}</li>
     </ul>
     </strong>`,
  };

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
export async function sendEmailToBuilder(
  emailVendedor: string,
  emailComprador: string,
  dataOrder: any
) {
  const msg = {
    to: emailComprador,
    from: emailVendedor, // Use the email address or domain you verified above
    subject: "una compra a sido registrada a tu nombre ",
    html: `<strong>
    La compra la hizo: ${emailComprador}
    <br>
    El producto :
    <br>
    <ul>
     <li> Titulo:  ${dataOrder.title}</li>
     <li> Img:  ${dataOrder.picture_url}</li>
     <li> Cantidad:  ${dataOrder.quantity}</li>
     <li> Precio:  ${dataOrder.unit_price}</li>
     </ul>
     </strong>`,
  };

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

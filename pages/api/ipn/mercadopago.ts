import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
import { getMerchanOrder } from "lib/mercadopago";
import { Order } from "models/order";
import { User } from "models/user";
import { sendEmailToSeller, sendEmailToBuilder } from "controller/sendgrid";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    const order = await getMerchanOrder(id);
    //del order tengo que sacar los datos de la orden echa para poder enciarlos al vnededor por email
    // order.items[0];
    if (order.order_status == "paid") {
      ///referencia a el id del producto que me pasan por la orden
      const orderId = order.external_reference;
      const myOrder = new Order(orderId);
      await myOrder.pull();
      myOrder.data.status = "closed";
      await myOrder.push();
      const userId = myOrder.data.userId;
      const dataUserBuilder = await User.getOneUser(userId);
      const emailUserBuilder = dataUserBuilder.email;

      ///aqui la logica para enviar eel mail con sendgrid (((2 meils uno para el vendedor otro para el comprador)))
      sendEmailToSeller(
        process.env.EMAIL_SELLER,
        emailUserBuilder,
        order.items[0]
      );
      sendEmailToBuilder(
        process.env.EMAIL_SELLER,
        emailUserBuilder,
        order.items[0]
      );
      console.log("UN PEDIDO  CERRO LA VENTA");
    }
  }
  return res.json("ok");
}

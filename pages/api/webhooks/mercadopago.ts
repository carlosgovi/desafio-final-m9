import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
import { getMerchanOrder } from "lib/mercadopago";
import { Order } from "models/order";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    const order = await getMerchanOrder(id);
    if (order.order_status == "paid") {
      ///referencia a el id del producto que me pasan por la orden
      const orderId = order.external_reference;
      const myOrder = new Order(orderId);
      await myOrder.pull();
      myOrder.data.status = "closed";
      await myOrder.push();
      ///aqui la logica para enviar eel mail con sendgrid (((2 meils uno para el vendedor otro para el comprador)))
    }
  }
  return res.json("ok");
}

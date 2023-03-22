import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { Order } from "models/order";
import method from "micro-method-router";
import { authMiddleware } from "lib/middelwares";
import { createPreference } from "lib/mercadopago";

////moockeo para ver solo los porducts enlistados de ejemplo
const products = {
  1234: {
    title: "mate",
    price: 100,
  },
};
////////////////
async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const { productId } = req.query as any;
  const product = products[productId];
  ///si el producto no esta enlistado
  if (!product) {
    return res.status(404).json({ mesage: "este producto no esta enlistado" });
  }
  ////crear order
  const order = await Order.createNewOrder({
    aditionalInfo: req.body,
    productId,
    userId: token.userId,
    status: "pending",
  });

  const pref = await createPreference({
    items: [
      {
        title: product.title,
        description: "un mate de prueba ",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "Mates S.A. ",
        quantity: 1,
        currency_id: "ARS",
        unit_price: product.price,
      },
    ],
    back_urls: {
      succes: "https//apx.school",
      pending: "https//apx.school/pending-payments",
      failure: "https//apx.school/failure_payments",
    },
    external_reference: order.id,
    notification_url:
      process.env.NOTIFICATION_URL + "/api/webhooks/mercadopago",
  });
  ///le envio el url donde el cliente tiene que entrar para hacer el pago
  res.send({ url: pref });
}
const handler = method({
  post: postHandler,
});
//// si pasa el middleware de auth con el token se ejecuta el handler que a se ves corre solo con el metodo post la duncion posthandler
export default authMiddleware(handler);

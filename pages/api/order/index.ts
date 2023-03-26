import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { Order } from "models/order";
import method from "micro-method-router";
import { authMiddleware } from "lib/middelwares";
import { createPreference } from "lib/mercadopago";
import { index as productIndex } from "lib/algolia";

////////////////
async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const { productId } = req.query as any;
  const searchResults = await productIndex.search(productId);
  const oneProduct: any = searchResults.hits[0];

  // const product = products[productId];
  ///si el producto no esta enlistado
  if (!searchResults.hits) {
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
        title: oneProduct.Name,

        picture_url: oneProduct.Images[0].url,
        category_id: oneProduct.Type,
        quantity: 1,
        currency_id: "ARS",
        unit_price: oneProduct.UnitCost,
      },
    ],
    back_urls: {
      succes: "https//apx.school",
      pending: "https//apx.school/pending-payments",
      failure: "https//apx.school/failure_payments",
    },
    external_reference: order.id,
    notification_url: process.env.NOTIFICATION_URL + "api/webhooks/mercadopago",
  });
  ///le envio el url donde el cliente tiene que entrar para hacer el pago
  res.send({ url: pref });
}
const handler = method({
  post: postHandler,
});
//// si pasa el middleware de auth con el token se ejecuta el handler que a se ves corre solo con el metodo post la duncion posthandler
export default authMiddleware(handler);

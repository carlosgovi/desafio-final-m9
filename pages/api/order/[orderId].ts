import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { Order } from "models/order";
import method from "micro-method-router";
import { authMiddleware } from "lib/middelwares";
import { createPreference } from "lib/mercadopago";
import { index as productIndex } from "lib/algolia";
import { firestore } from "lib/firebase";

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const { orderId } = req.query as any;
  ///le paso la order id para que me retorne los datos de esa orden
  const order = await Order.getOneOrder(orderId);

  res.send(order);
}
const handler = method({
  get: postHandler,
});
//// si pasa el middleware de auth con el token se ejecuta el handler que a se ves corre solo con el metodo post la duncion posthandler
export default authMiddleware(handler);

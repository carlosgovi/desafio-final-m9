import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { Order } from "models/order";
import method from "micro-method-router";
import { authMiddleware } from "lib/middelwares";
import { createPreference } from "lib/mercadopago";
import { index as productIndex } from "lib/algolia";
import { firestore } from "lib/firebase";
import { handlerCORS } from "lib/middelwares";

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const orders = await Order.getAllOrders();

  res.send(orders.docs);
}
const handler = method({
  get: postHandler,
});
//// si pasa el middleware de auth con el token se ejecuta el handler que a se ves corre solo con el metodo post la duncion posthandler
const authMiddlewarePass = authMiddleware(handler);
export default handlerCORS(authMiddlewarePass);

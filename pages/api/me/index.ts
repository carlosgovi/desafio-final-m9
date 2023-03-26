import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { authMiddleware } from "lib/middelwares";
import method from "micro-method-router";

async function getHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const user = new User(token.userId);

  await user.pull();

  res.send(user.data);
}

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const user = new User(token.userId);

  await user.pull();

  const datos = { ...req.body };
  console.log({ datos });

  if (datos) {
    console.log("pasa igualllllllllllllllllllllllllll");

    user.data = datos;
    await Promise.all([
      user.push(), // Espera a que se complete la operación de actualización
      user.pull(), // Espera a que se complete la operación de lectura
    ]);
  }
  res.send(user.data);
}
const handler = method({
  patch: postHandler,
  get: getHandler,
});
export default authMiddleware(handler);

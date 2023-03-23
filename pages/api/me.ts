import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { authMiddleware } from "lib/middelwares";
async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  console.log(token);
  const nombre = req.body.nombre;
  const user = new User(token.userId);
  await user.pull();

  const datos = { ...req.body };
  if (datos) {
    user.data = datos;
    await Promise.all([
      user.push(), // Espera a que se complete la operación de actualización
      user.pull(), // Espera a que se complete la operación de lectura
    ]);
  }
  res.send(user.data);
}

export default authMiddleware(handler);

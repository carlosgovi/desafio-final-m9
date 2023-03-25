import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { authMiddleware } from "lib/middelwares";
async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const prompt: any = req.query.prompt;

  const user = new User(token.userId);
  await user.pull();

  const dato = { [prompt]: req.body[prompt] };

  ////si los datos pasados por el body concuerdan con el prompt como key se guardan en la db
  if (dato[prompt]) {
    user.data = dato;
    await Promise.all([
      user.push(), // Espera a que se complete la operación de actualización
      user.pull(), // Espera a que se complete la operación de lectura
    ]);
  }
  res.send(user.data);
}

export default authMiddleware(handler);

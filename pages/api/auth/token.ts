import { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "models/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  ///findByEmailAndCode busca el email y el code que me pasan por el body
  const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);
  ///si auth no existe retorno un 401
  if (!auth) {
    return res.status(401).send({ message: "email o codigo incorrecto" });
  }

  ///modifico la data que viene de firebase para visualizar el sexpires mejor
  const expires = auth.isCodeExpired();
  //si el code expiro retorno un 401
  if (expires) {
    return res.status(401).send({ message: "token expirado" });
  }
  ///si el code no expiro retorno el token
  const token = generate({ userId: auth.data.userId });

  res.send({ token });

  ///este generador recibe el userId para asi poder generar el token
}

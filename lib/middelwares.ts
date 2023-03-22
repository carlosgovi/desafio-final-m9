import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "lib/jwt";
import parseToken from "parse-bearer-token";
/////////////////////////se evalua el token y si todo es correcto ejecuta handler
export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      return res.status(401).send({ message: "token incorrecto" });
    }
    console.log({ token });
    const decodedToken = decode(token);
    console.log({ decodedToken });

    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
}

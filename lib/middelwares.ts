import { NextApiRequest, NextApiResponse } from "next";
import { decode } from "lib/jwt";
import parseToken from "parse-bearer-token";
import NextCors from "nextjs-cors";
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
export function handlerCORS(callback) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // Rest of the API logic
    callback(req, res);
    //res.json({ message: "Hello NextJs Cors!" });
  };
}

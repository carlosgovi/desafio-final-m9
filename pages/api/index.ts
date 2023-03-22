import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firebase";
import { Auth } from "models/auth";
import { User } from "models/user";
import { sendCode } from "controller/auth";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  //     //crear un nuevo dato
  //   const newUser = await firestore
  //     .collection("auth")
  //     .add({ email: "cgovi66@gmail.com" });
  ///       //me traigo los datos del Auth pasndole el ID
  //   //hago una nueva instancia de Auth pasandole el ID
  //   const newInstanciaDeAuth = new Auth("R7lJInl56d8ZF4CIJZ0V");
  //   //luego hago un aweit de la nueva instancia llamando al metodo pull que retorna la data
  //   await newInstanciaDeAuth.pull();
  //   //         //updateo los datos de la nueva instancia
  //   newInstanciaDeAuth.data.testNuevoDatoUpdateado = "nuevo dato updateado";
  //   await newInstanciaDeAuth.push();
  ///   //findOrCreateAuth  busca y si ni existe lo crea
  //   const buscarocrear = await findOrCreateAuth(req.body.email);
  ///      //sendcode se encarga de generar el codigo de para enviar por mail y generar una fecha de expiracion del mail

  const auth = await sendCode(req.body.email);
  return res.json(auth);
}

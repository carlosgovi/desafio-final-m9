import { Auth } from "models/auth";
import { User } from "models/user";
import addMinutes from "date-fns/addMinutes";
import gen from "random-seed";
import { sendEMail } from "./sendgrid";

var seed = "asdfasdgasdgasd";
var random = gen.create(seed);
export async function findOrCreateAuth(email: string) {
  //limpio el email que me pasan
  const emailClean = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(emailClean);
  if (auth) {
    return auth;
  } else {
    ///aqui iria el new User y un new Auth
    const newUser = await User.createNewUser({ email: emailClean });
    const newAuth = await Auth.createNewAuth({
      email: emailClean,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}
export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  //genero el codigo para pasar
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  //modifico la ficha actual agregando los 20minuts
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  ////auth.data.used es el estado de el codigo de auth cada vez que se crea es puesto en false
  auth.data.used = false;
  await auth.push();

  ///aca iria la logica de sendgrid////////////////////////////////////////////////SENDGRID
  await sendEMail(email, code);

  return true;
}

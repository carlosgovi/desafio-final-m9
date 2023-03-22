import jwt from "jsonwebtoken";
///genero el token
export function generate(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET);
}

//decodeo el token
export function decode(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("token incorrecto");

    return null;
  }
}

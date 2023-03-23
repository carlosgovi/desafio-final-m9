import { firestore } from "../lib/firebase";
import isAfter from "date-fns/isAfter";

const collection = firestore.collection("auth");
export class Auth {
  //la coleccion de users
  //la referencia a ese user va ID
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  ///el constructor solo guarda el id que me es pasado al instanciar la clase
  constructor(id) {
    //el constructor se encarga de guardar la referencia de la coleccion con el ID que fue pasado
    this.ref = collection.doc(id);
    this.id = id;
  }
  //pull hace un get de la referencia de la coleccion y guarda los datos  en data
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  //push hace un update de los datos en la coleccion referencida
  async push() {
    this.ref.update(this.data);
  }
  isCodeExpired() {
    ///ahora
    const now = new Date();
    //tiempoo de expirado
    const expired = this.data.expires.toDate();
    //retorno el metodo de la lib
    return isAfter(now, expired);
  }
  static async findByEmail(email: string) {
    //limpio el email
    const emailClean = Auth.cleanEmail(email);
    //busnco en la coleccion entera el email
    const result = await collection.where("email", "==", emailClean).get();
    if (result.docs.length) {
      const first = result.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.data = first.data();
      return newAuth;
    } else {
      return null;
    }
  }
  //createNewAuth crea  un nuevo Auth en la db

  static async createNewAuth(data) {
    const newUserSnap = await collection.add(data);
    const newAuth = new Auth(newUserSnap.id);
    newAuth.data = data;
    return newAuth;
  }
  ///aux para limpiar el amail
  static cleanEmail(email: string) {
    return email.trim().toLowerCase();
  }

  ///findByEmailAndCode busca en la db pro el email y por el dodigo y retorna el match de esos datos
  static async findByEmailAndCode(email: string, code: number) {
    // const cleanEmail = email.trim().toLowerCase();
    const cleanEmail = Auth.cleanEmail(email);

    const result = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)

      .get();

    if (result.empty) {
      console.error("email o code no coinciden");
      return null;
    } else {
      const doc = result.docs[0];
      const auth = new Auth(doc.id);
      auth.data = doc.data();

      // Verificar si el token ya ha sido utilizado
      if (auth.data.used) {
        console.error("Token ya ha sido utilizado");
        return null;
      }

      // Actualizar el campo "used" a true  ////este campo se pone en true si el codigo fue utilizado
      auth.data.used = true;
      await auth.push();

      return auth;
    }
  }
}
//////solucionar que cuando cree el codigo nuevo otra vez cambie el data.used a false

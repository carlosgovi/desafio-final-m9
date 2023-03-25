import { firestore } from "../lib/firebase";

const collection = firestore.collection("users");
export class User {
  //la coleccion de users
  //la referencia a ese user va ID
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  //el constructor se encarga de guardar la referencia de la coleccion con el ID que fue pasado

  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
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
  ///createNewUser crea un nuevo user en la db
  static async createNewUser(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
  ///get un solo user
  static async getOneUser(userId) {
    const user = (await collection.doc(userId).get()).data();

    return user;
  }
}

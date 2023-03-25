import { firestore } from "../lib/firebase";

const collection = firestore.collection("orders");
////**una buena opcion seria tipar toda la orden entera**/////
export class Order {
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
  static async createNewOrder(newOrderData = {}) {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    newOrder.data.createdAt = new Date();
    return newOrder;
  }
  static async getAllOrders() {
    const getOrderSnap = await collection.get();

    return getOrderSnap;
  }
  static async getOneOrder(id) {
    ////a doc le paso el id del documento que hay esta el dato de la orden
    const OrderSnap = (await collection.doc(id).get()).data();

    return OrderSnap;
  }
}

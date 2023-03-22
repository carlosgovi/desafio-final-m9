import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_CONNECT);

///condicional para que vercel no tenga problemas al hacer la coneccion con firebase
if (admin.apps.length == 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const firestore = admin.firestore();
export { firestore };

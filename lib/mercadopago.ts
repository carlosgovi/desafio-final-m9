import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.ACCES_ML,
});
export async function getMerchanOrder(id) {
  const res = await mercadopago.merchant_orders.get(id);
  console.log(res.body);
  return res.body;
}

export async function createPreference(preference) {
  try {
    const res = await mercadopago.preferences.create(preference);
    return res;
  } catch (err) {
    console.error(err);
  }
}

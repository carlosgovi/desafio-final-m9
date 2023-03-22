import { generate, decode } from "./jwt";
////test con ava de JWT
import test from "ava";

test("JWT encode/decode", (t) => {
  const payload = { carlos: true };
  const gen = generate(payload);
  const dec: any = decode(gen);

  delete dec.iat;
  console.log({ dec });
  console.log({ payload });
  t.deepEqual(payload, dec);
});

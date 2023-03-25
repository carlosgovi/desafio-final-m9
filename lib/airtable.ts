import Airtable from "airtable";
const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base("app3lt4Zptih1TDVT");
export { airtableBase };

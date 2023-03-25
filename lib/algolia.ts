import algoliasearch from "algoliasearch";

const client = algoliasearch("M9QTOU105A", process.env.ALGOLIA_KEY);
const index = client.initIndex("productsDB");

export { index };

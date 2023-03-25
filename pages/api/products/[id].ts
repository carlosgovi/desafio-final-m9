import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFromRequest } from "lib/requests";
import { index as productIndex } from "lib/algolia";
import { authMiddleware } from "lib/middelwares";
// ejemplo de la request (((http://localhost:3000/api/products/attw1WlLKTAd2HZLo)))

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.id as string;

  const querySearch = req.query.search as string;

  const searchResults = await productIndex.search(query).then(({ hits }) => {
    res.send({
      results: hits,
      longitud: { total: hits.length },
    });
  });
}

export default authMiddleware(handler);

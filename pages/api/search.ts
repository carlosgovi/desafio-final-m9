import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFromRequest } from "lib/requests";
import { index as productIndex } from "lib/algolia";
import { authMiddleware } from "lib/middelwares";
// ejemplo de la query (((http://localhost:3000/api/search?search=table&limit=10&offset=50)))

///{limit :10 quierto 10 items .....offset:50 esos 10 items aprartir del item 50 }
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { offset, limit } = getOffsetAndLimitFromRequest(req, 100, 10000);
  const querySearch = req.query.search as string;

  const searchResults = await productIndex
    .search(querySearch, {
      ///reemplazo para probar  lo que me entrega la query
      offset: offset,
      length: limit,
    })
    .then(({ hits }) => {
      res.send({
        results: hits,
        pagination: { offset, limit, total: hits.length },
      });
    });
}

export default authMiddleware(handler);

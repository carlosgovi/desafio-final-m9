import type { NextApiRequest, NextApiResponse } from "next";

export function getOffsetAndLimitFromRequest(
  req: NextApiRequest,
  maxLimit,
  maxOffset
) {
  const queryLimit = parseInt((req.query.limit as string) || "0");
  const queryOffset = parseInt((req.query.offset as string) || "0");
  //limit ayuda a marcar un limite en la paginacion declarando un limite(((limit=cantidad de items a devolver:::offset=apartir de el offset en adelante se van a devolver los items)))
  const limit = queryLimit
    ? queryLimit <= maxLimit
      ? queryLimit
      : maxLimit
    : 10;
  const offset = queryOffset < maxOffset ? queryOffset : 0;
  return {
    limit,
    offset,
  };
}

import { unauthorizedError } from "./errorUtils";

export const checkParamsMatchs = (id1: number, id2: number) => {
  if (id1 !== id2) throw unauthorizedError("Inconsistency in the ids sent.");
};

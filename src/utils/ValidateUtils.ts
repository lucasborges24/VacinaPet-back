export const checkParamsMatchs = (id1: number, id2: number) => {
    if (id1 !== id2) {
      const error: object = {
        type: "Unauthorized",
        message: "Inconsistency in the ids sent.",
      };
      throw error;
    }
  };
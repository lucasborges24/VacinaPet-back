import joi from "joi";
import dayjs from "dayjs";

const now = dayjs().format("MM-DD-YYYY");
const maxAge = dayjs(now).subtract(30, "year").format("MM-DD-YYYY");

export const petSchema = joi.object({
  name: joi.string().required(),
  birthDate: joi.date().less(now).greater(maxAge).required(),
  genre: joi.string().valid("male", "female").required(),
  type: joi.string().valid("dog", "cat").required(),
});

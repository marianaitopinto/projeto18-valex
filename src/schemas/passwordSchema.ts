import joi from "joi";

const passwordSchema = joi.object({
  password: joi
    .string()
    .regex(/^\d{4}$/)
    .required(),
});

export default passwordSchema;

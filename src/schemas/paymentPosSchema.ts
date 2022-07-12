import joi from "joi";

const paymentPosSchema = joi.object({
  cardId: joi.number().required(),
  businessId: joi.number().required(),
  password: joi
    .string()
    .regex(/^\d{4}$/)
    .required(),
  amount: joi.number().greater(0).required(),
});

export default paymentPosSchema;

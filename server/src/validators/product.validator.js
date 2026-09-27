import { body, param, validationResult } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 to 100 characters long")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Title can only have small case and capital case characters"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description must be between 20 to 500 characters long"),
  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Price amount must be a floating number and must be greater than 0",
    ),
  body("price.currency")
    .exists()
    .withMessage("Currency is required")
    .bail()
    .isString()
    .withMessage("Currency must be a string")
    .isIn(["INR", "USD", "EUR"])
    .withMessage("Currency must be INR, USD or EUR"),
  body("sizes")
    .exists()
    .withMessage("Sizes is required")
    .bail()
    .isArray()
    .withMessage("Sizes must be an array"),
  body("sizes.*.size")
    .exists()
    .withMessage("Size must be present in every entry of sizes array")
    .bail()
    .isString()
    .withMessage("Size must be a string value")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size can be one of these XS, S, M, L, XL or XXL"),
  body("sizes.*.stock")
    .exists()
    .withMessage("Stock must be present in every entry of sizes array")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a integer value"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const unlistProductValidator = [
  param("id")
    .exists()
    .withMessage("Product Id is required in req params")
    .bail()
    .isMongoId()
    .withMessage("Product is must be a valid mongo object id"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Data",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const listProductValidator = [
  param("id")
    .exists()
    .withMessage("Product Id is required in req params")
    .bail()
    .isMongoId()
    .withMessage("Product is must be a valid mongo object id"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Data",
        errors: errors.array(),
      });
    }
    next();
  },
];

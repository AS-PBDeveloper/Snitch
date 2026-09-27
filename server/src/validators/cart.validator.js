import { body, validationResult } from "express-validator";

export const addToCartValidator = [
  body("productId")
    .exists()
    .withMessage("Product Id is required")
    .bail()
    .isString()
    .withMessage("Product Id must be a string")
    .bail()
    .isMongoId()
    .withMessage("Product Id is invalid"),
  body("quantity")
    .exists()
    .withMessage("Quantity is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0"),
  body("size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be a string")
    .bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size can be one of these XS, S, M, L, XL or XXL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

import { Router } from "express";
import { createProductValidator } from "../validators/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
} from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024,
  },
});

const router = Router();

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "User is not authorized to create a products" });
    }
    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));

    next();
  },
  createProductValidator,
  createProduct,
);

router.get("/", authenticate, listAllProducts);

export default router;

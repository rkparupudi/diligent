"use strict";

const express = require("express");

const productController = require("./../controllers/product.controller");

const router = express.Router();

router.post("/create", productController.create);
router.get("/:id", productController.findById);
router.get("/:id/:currency", productController.findById);
router.get("/most/viewed", productController.mostViewed);
router.delete("/delete/:id", productController.delete);

module.exports = router;

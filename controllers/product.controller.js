"use strict";

const Product = require("./../models/product.model");
/**
 * @name create
 * @description creates a new product
 * @param {*} request
 * @param {*} response
 */
exports.create = function (request, response) {
  const newProduct = new Product(request?.body);
  if (
    request.body.constructor === Object &&
    Object.keys(request.body).length === 0
  ) {
    response
      .status(400)
      .send({ error: true, message: "please provide all mandatory fields" });
  } else {
    Product.create(newProduct, function (error, product) {
      if (error) {
        response.locals.error = error;
        const status = error.status || 500;
        response.status(status);
        response.send("Error");
      }

      response.json({
        error: false,
        message: "Product added",
        data: newProduct,
      });
    });
  }
};

/**
 * @name findById
 * @description gets a single product by id
 * @param {*} request
 * @param {*} response
 */
exports.findById = function (request, response) {
  Product.findById(
    request?.params?.id,
    request?.params?.currency,
    function (error, product) {
      if (error) response.send(error);

      response.json(product);
    }
  );
};

/**
 * @name mostViewed
 * @description gets the lists of most viewed products
 * @param {*} request
 * @param {*} response
 */
exports.mostViewed = function (request, response) {
  Product.mostViewed(function (error, product) {
    if (error) response.send(error);

    response.json(product);
  });
};

/**
 * @name delete
 * @description deletes a product
 * @param {*} request
 * @param {*} response
 */
exports.delete = function (request, response) {
  Product.delete(request?.params?.id, function (error, product) {
    if (error) response.send(error);

    response.json(product);
  });
};

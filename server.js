"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (request, response) => {
  response.send("Hi there!!!");
});

const productRoutes = require("./routes/product.route");
app.use("/api/v1/products", productRoutes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

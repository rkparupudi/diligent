const dbConn = require("./../config/db.config");
const api = require("./apiUtil");

const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.description = product.description;
  this.views_count = product.views_count;
  this.currency = product.currency;
};

Product.create = function (newProduct, result) {
  try {
    const sql = "INSERT INTO PRODUCT_INFO SET ?";
    dbConn.query(sql, newProduct, function (error, res) {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Product created successfully");
        result(res.insertId);
      }
    });
  } catch (error) {
    console.log(`error in create >>> ${error}`);
  }
};

Product.findById = function (id, currency, result) {
  try {
    const sql = "SELECT * FROM PRODUCT_INFO WHERE PRODUCTID = ?";
    dbConn.query(sql, parseInt(id), async function (error, res) {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
      } else {
        if (!currency) {
          result(null, res);
        } else {
          const dbCurrency = res[0].currency;
          const dbPrice = res[0].price;
          const url = `https://api.apilayer.com/currency_data/convert?to=${currency}&from=${dbCurrency}&amount=${dbPrice}`;
          const response = await api.convertCurrencyPrice(url);
          const finalResult = {
            productid: res[0].productid,
            name: res[0].name,
            price: response?.data?.result,
            description: res[0].description,
            views_count: res[0].views_count,
            currency: currency,
          };
          result(null, finalResult);
        }
      }
    });

    const updateSql =
      "UPDATE PRODUCT_INFO SET VIEWS_COUNT = VIEWS_COUNT + 1 WHERE PRODUCTID = ?";
    dbConn.query(updateSql, parseInt(id), function (error, res) {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
      }
    });
  } catch (error) {
    console.log(`error in findById >>>> ${error}`);
  }
};

Product.mostViewed = function (result) {
  try {
    const sql = "SELECT * FROM PRODUCT_INFO ORDER BY VIEWS_COUNT DESC";
    dbConn.query(sql, function (error, res) {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
      } else {
        result(null, res);
      }
    });
  } catch (error) {
    console.log(`error in mostViewed >>>> ${error}`);
  }
};

Product.delete = function (id, result) {
  try {
    const sql = "SELECT * FROM PRODUCT_INFO WHERE PRODUCTID = ?";
    dbConn.query(sql, parseInt(id), function (error, res) {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
      } else {
        result(null, res);
        const insertSql = "INSERT INTO AUDITLOG SET ?";
        // res.deleteOn = new Date();
        const today = new Date();
        const params = {
          productid: res[0].productid,
          name: res[0].name,
          price: res[0].price,
          description: res[0].description,
          views_count: res[0].views_count,
          currency: res[0].currency,
          deletedOn: today,
        };

        dbConn.query(insertSql, params, function (error, res) {
          if (error) {
            console.log("Error: ", error);
          } else {
            console.log("Record inserted in auditlog successfully");
            result(res.insertId);
          }
        });
        const sql = "DELETE FROM PRODUCT_INFO WHERE PRODUCTID = ?";
        dbConn.query(sql, parseInt(id), function (error, res) {
          if (error) {
            console.log("Error: ", error);
            result(error, null);
          } else {
            result(null, res);
          }
        });
      }
    });
  } catch (error) {
    console.log(`error in delete >>>> ${error}`);
  }
};
module.exports = Product;

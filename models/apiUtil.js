"use strict";

const axios = require("axios");

function getConfig(url) {
  const config = {
    url: url,
    method: "GET",
    redirect: "follow",
    headers: {
      apikey: "fiyzSU8WTbBXlT259KTjie3T8CoI43wj",
    },
  };

  return config;
}
async function convertCurrencyPrice(url) {
  try {
    return await axios(getConfig(url));
  } catch (error) {
    console.log(`error in ${convertCurrencyPrice.name} >>>> ${error}`);
  }
}

module.exports = { convertCurrencyPrice };

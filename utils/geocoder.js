const Geocoder = require("node-geocoder");
const dotenv = require("dotenv").config();

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

module.exports = Geocoder(options);

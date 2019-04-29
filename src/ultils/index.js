class Utils {
  getDecimalValue(price) {
    const values = price.toString().split(".");
    return values.length > 1 ? parseInt(values[1]) : null;
  }
}

const utils = new Utils();

module.exports = utils;

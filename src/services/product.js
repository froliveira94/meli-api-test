const axios = require("axios");

const options = {
  baseURL: "http://api.mercadolibre.com/sites/MLA",
  headers: {
    "Content-Type": "application/json"
  }
};

class ProductService {
  get(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const request = axios.create(options);
        const query = req.query.q;
        const products = await request.get(`/search?q=${query}&limit=4`);
        resolve(products);
      } catch (err) {
        reject({ error: err });
      }
    });
  }
  getById(req) {
    return new Promise(async (resolve, reject) => {
      try {
        options.baseURL = "https://api.mercadolibre.com/items/";
        const request = axios.create(options);
        const id = req.params.id;
        const product = await request.get(`${id}`);
        resolve(product);
      } catch (err) {
        reject({ error: err });
      }
    });
  }
  getDescription(req) {
    return new Promise(async (resolve, reject) => {
      try {
        options.baseURL = "https://api.mercadolibre.com/items/";
        const request = axios.create(options);
        const id = req.params.id;
        const description = await request.get(`${id}/description`);
        resolve(description);
      } catch (err) {
        reject({ error: err });
      }
    });
  }
}

const productService = new ProductService();

module.exports = productService;

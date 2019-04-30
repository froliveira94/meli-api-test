const axios = require("axios");

class ProductService {
  async get(req) {
    try {
      const query = req.query.q;
      const products = await axios.get(
        `http://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
      );
      return products;
    } catch (err) {
      return { error: err };
    }
  }

  async getById(req) {
    try {
      const id = req.params.id;
      const product = axios.get(`https://api.mercadolibre.com/items/${id}`);
      return product;
    } catch (err) {
      return { error: err };
    }
  }

  async getDescription(req) {
    try {
      const id = req.params.id;
      const description = await axios.get(
        `https://api.mercadolibre.com/items/${id}/description`
      );
      return description;
    } catch (err) {
      return { error: err };
    }
  }
}

const productService = new ProductService();

module.exports = productService;

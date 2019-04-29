const utils = require("../ultils");

class ProductController {
  getCategories(data) {
    let categories = [];
    if (data.filters.length) {
      const filterCategory = data.filters.find(item => item.id == "category");
      const PathCategories = filterCategory.values.map(item => {
        return item.path_from_root;
      });
      categories = PathCategories[0].map(item => {
        return item.name;
      });
    }
    return categories;
  }
  getItems(data) {
    const items = data.map(item => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: parseFloat(item.price),
          decimal: utils.getDecimalValue(item.price)
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
      };
    });
    return items;
  }
  getData(data) {
    const newData = {
      author: {
        name: "",
        lastname: ""
      },
      categories: this.getCategories(data),
      items: this.getItems(data.results)
    };
    return newData;
  }
  getPicture(pictures, maxSize) {
    return pictures.filter(item => item.max_size == `${maxSize}x${maxSize}`)[0]
      .url;
  }
  getProduct(data, description) {
    const product = {
      author: {
        name: "",
        lastname: ""
      },
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: parseFloat(data.price),
        decimal: utils.getDecimalValue(data.price)
      },
      picture: this.getPicture(data.pictures, "840"),
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      description: description.plain_text
    };
    return product;
  }
}

const productController = new ProductController();

module.exports = productController;

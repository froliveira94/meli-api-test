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
        free_shipping: item.shipping.free_shipping,
        state_name: item.address.state_name
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
      categories: !!data ? this.getCategories(data) : [],
      items: !!data ? this.getItems(data.results) : []
    };
    return newData;
  }
  getPicture(pictures) {
    const index = pictures.length - 1;
    return pictures[index];
  }
  getProduct(data, description) {
    const picture = !!data ? this.getPicture(data.pictures) : "";
    const product = {
      author: {
        name: "",
        lastname: ""
      },
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: !!data ? parseFloat(data.price) : null,
        decimal: !!data ? utils.getDecimalValue(data.price) : null
      },
      picture: picture.url,
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

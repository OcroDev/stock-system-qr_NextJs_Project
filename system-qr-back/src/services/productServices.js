import PRODUCT from "../models/product.js";
import sequelize from "../database/index.js";

const productServices = {
  findAll: () => {
    try {
      return PRODUCT.findAll({
        where: { isdeleted: false },
        order: [
          ["p_ubication", "DESC"],
          ["id", "ASC"],
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
  findOneByDescription: (description) => {
    try {
      return PRODUCT.findOne({ where: { p_description: description } });
    } catch (error) {
      console.log(error);
    }
  },
  findOnebyId: (productId) => {
    try {
      return PRODUCT.findByPk(productId);
    } catch (error) {
      console.log(error);
    }
  },

  update: (id, product) => {
    try {
      return PRODUCT.update(
        {
          p_description: product.p_description,
          p_unit: product.p_unit,
          p_minstock: product.p_minstock,
          p_ubication: product.p_ubication,
        },
        { where: { id: id } }
      );
    } catch (error) {
      console.log(error);
    }
  },
  store: (newProduct) => {
    try {
      const product = PRODUCT.create(newProduct);
      return product;
    } catch (error) {
      console.log(error);
    }
  },
  delete: (productId) => {
    try {
      return PRODUCT.update({ isdeleted: true }, { where: { id: productId } });
    } catch (error) {
      console.log(error);
    }
  },
  updateStock: (productId, stock) => {
    try {
      return PRODUCT.update({ p_stock: stock }, { where: { id: productId } });
    } catch (error) {
      console.log(error);
    }
  },
  findByMinStock: () => {
    try {
      const products = sequelize.query(
        "select * from products where p_stock <= p_minstock order by p_ubication desc",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return products;
    } catch (error) {
      console.log(error);
    }
  },
  getMustOut: () => {
    try {
      const products = sequelize.query(
        `select movements.product_id, products.p_description, products.p_unit, count (movements.product_id ) as total_out,sum (movements.mov_quantity) as quantity from movements inner join products on products.id = movements.product_id where movements.operation_type_id = 2 group by products.p_description,  movements.product_id, products.p_unit order by quantity asc`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      return products;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productServices;

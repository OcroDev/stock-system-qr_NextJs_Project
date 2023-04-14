import sequelize from "../database/index.js";
import ORDER from "../models/orders.js";

const orderServices = {
  findAll: () => {
    try {
      return ORDER.findAll({ where: { isdeleted: false } });
    } catch (error) {
      console.log(error);
    }
  },
  findOrderReportById: (orderID) => {
    try {
      return sequelize.query(
        `select orders.id, warehouses.w_description, users.u_firstname as username, departments.d_name, order_movements.mov_quantity, order_movements.mov_note, order_movements.product_id, order_movements.order_cod, products.p_description, products.p_unit, orders.createdat from orders inner join warehouses on warehouses.id = orders.warehouse_id inner join users on users.id = orders.user_id inner join departments on departments.id = orders.department_id inner join order_movements on order_movements.order_cod = orders.id inner join products on products.id = order_movements.product_id where orders.isdeleted = false and orders.id=${orderID}`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  findAllReport: () => {
    try {
      return sequelize.query(
        `select orders.id, orders.createdat as date, warehouses.w_description as warehouse_name, users.u_firstname as user_name, departments.d_name as department_name from orders inner join warehouses on warehouses.id = orders.warehouse_id inner join users on users.id = orders.user_id inner join departments on departments.id = orders.department_id where orders.isdeleted = false order by orders.id desc`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  findLastId: () => {
    try {
      return sequelize.query("select count (id) as total from orders", {
        type: sequelize.QueryTypes.SELECT,
      });
    } catch (error) {
      console.log(error);
    }
  },
  store: (newOrder) => {
    try {
      return ORDER.create(newOrder);
    } catch (error) {
      console.log(error);
    }
  },
  delete: (orderID) => {
    try {
      return ORDER.update({ isdeleted: true }, { where: { id: orderID } });
    } catch (error) {
      console.log(error);
    }
  },
};

export default orderServices;

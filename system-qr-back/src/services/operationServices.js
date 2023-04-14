import OPERATION from "../models/operation.js";
import sequelize from "../database/index.js";

const operationServices = {
  findLastId: () => {
    try {
      return OPERATION.findAll({
        order: [["id", "DESC"]],
      });
    } catch (error) {
      console.log(error);
    }
  },
  findInOperations: () => {
    let operation;
    try {
      return (operation = sequelize.query(
        `select operations.id, operations.operation_type_id, products.p_description, movements.mov_quantity, operation_types.type as operationType, operations.createdat as date  from operations inner join movements on movements.operation_cod = operations.id inner join products on products.id = movements.product_id inner join operation_types on operation_types.id = movements.operation_type_id where operations.operation_type_id = 1 and operations.isdeleted=false order by operations.id DESC `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
  findOutOperations: () => {
    let operation;
    try {
      return (operation = sequelize.query(
        `select operations.id, operations.operation_type_id, warehouses.w_description as warehouse_in, departments.d_name as dep_in, products.p_description, movements.mov_quantity, operation_types.type as operationType, operations.createdat as date, operations.op_status from operations inner join movements on movements.operation_cod = operations.id inner join warehouses on warehouses.id = operations.warehouse_in inner join departments on departments.id = operations.dep_in inner join products on products.id = movements.product_id inner join operation_types on operation_types.id = movements.operation_type_id where operations.operation_type_id = 2 and operations.isdeleted=false order by operations.id DESC`,

        {
          type: sequelize.QueryTypes.SELECT,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
  findOutOperationsById: (id) => {
    let operation;
    try {
      return (operation = sequelize.query(
        `select operations.id, warehouses.w_description as warehouse_in, products.p_description, movements.mov_quantity, operation_types.type as operationType, operations.createdat, products.p_unit, users.u_firstname as name, users.u_lastname as lastname, operations.warehouse_in as warehouse_in_id, operations.warehouse_out as warehouse_out_id, operations.operation_auth, departments.d_name as dep_in from operations inner join movements on movements.operation_cod = operations.id inner join warehouses on warehouses.id = operations.warehouse_in inner join products on products.id = movements.product_id inner join operation_types on operation_types.id = movements.operation_type_id inner join users on users.id = operations.u_make inner join departments on departments.id = operations.dep_in where operations.operation_type_id = 2 and operations.isdeleted=false and operations.id = ${id} order by operations.id DESC`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
  findInOperationsById: (id) => {
    let operation;
    try {
      return (operation = sequelize.query(
        `select operations.id, warehouses.w_description as warehouse_IN, products.p_description, movements.mov_quantity, operation_types.type as operationType, operations.createdat, products.p_unit from operations inner join movements on movements.operation_cod = operations.id inner join warehouses on warehouses.id = operations.warehouse_in inner join products on products.id = movements.product_id inner join operation_types on operation_types.id = movements.operation_type_id where operations.operation_type_id = 1 and operations.isdeleted=false and operations.id = ${id} order by operations.id DESC`,

        {
          type: sequelize.QueryTypes.SELECT,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
  findOutOperationsByDepartment: (department, warehouse) => {
    let operation;
    try {
      return (operation = sequelize.query(
        `select operations.operation_type_id, operation_types.type, departments.d_name, warehouses.w_description, movements.operation_cod, movements.mov_quantity, movements.product_id, products.p_description from operations join operation_types on operation_types.id = operations.operation_type_id join departments on departments.id = operations.dep_in join warehouses on warehouses.id = operations.warehouse_in join movements on movements.operation_cod = operations.id join products on products.id = movements.product_id where departments.d_name = '${department}' and warehouses.w_description = '${warehouse}'`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
  countByType: (operation_type) => {
    try {
      return OPERATION.count({
        where: {
          operation_type_id: operation_type,
          //isdeleted: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  store: (newOperation) => {
    try {
      console.log("operation in services", newOperation);
      const operation = OPERATION.create(newOperation);
      return operation;
    } catch (error) {
      console.log(error);
    }
  },
  deleteOperation: (id) => {
    try {
      return OPERATION.update(
        {
          isdeleted: true,
        },
        { where: { id: id } }
      );
    } catch (error) {
      console.log(error);
    }
  },
  statusUpdate: (operationId) => {
    try {
      return OPERATION.update(
        { op_status: true },
        { where: { id: operationId } }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default operationServices;

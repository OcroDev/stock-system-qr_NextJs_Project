import orderServices from "../services/orderServices.js";

const orderController = {
  findAll: async (req, res) => {
    const orders = await orderServices.findAll();

    return res.status(200).json({
      status: 200,
      orders,
    });
  },

  findAllReport: async (req, res) => {
    const ordersReport = await orderServices.findAllReport();

    return res.status(200).json({
      status: 200,
      ordersReport,
    });
  },

  findLastId: async (req, res) => {
    const orders = await orderServices.findLastId();
    const { total } = orders[0];

    return res.status(200).json({
      status: 200,
      total,
    });
  },
  findOrderReportById: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "El id del pedido no puede estar vacío",
      });
    }

    const orderFind = await orderServices.findOrderReportById(id);

    if (!orderFind) {
      return res.status(404).json({
        status: 404,
        message: "el pedido no se encuentra en la base de datos",
      });
    }

    return res.status(200).json({
      status: 200,
      orderFind,
    });
  },
  store: async (req, res) => {
    const { warehouse_id, user_id, department_id } = req.body;

    if (!user_id) {
      res.status(400).json({
        status: 400,
        message: "falta el id del usuario",
      });
    }

    const newOrder = {
      warehouse_id,
      user_id,
      department_id,
    };

    const orderStored = await orderServices.store(newOrder);

    if (!orderStored) {
      return res.status(500).json({
        status: 500,
        message: "La operacion no pudo ser ejecutada",
      });
    }

    return res.status(201).json({
      status: 201,
      message: "Operacion creada",
      operation: orderStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "El id no puede estar vacio",
      });
    }

    const orderDeleted = await orderServices.delete(id);

    if (!orderDeleted) {
      return res.status(500).json({
        status: 500,
        message: "error al intentar eliminar el pedido",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Pedido eliminado",
      orderDeleted,
    });
  },
};

export default orderController;

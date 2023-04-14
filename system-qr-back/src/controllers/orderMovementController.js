import orderMovementServices from "../services/orderMovementServices.js";

const orderMovementController = {
  store: async (req, res) => {
    const { product_id, mov_note, mov_quantity, order_cod } = req.body;

    if (!order_cod) {
      return res.status(400).json({
        status: 400,
        message: "El codigo del pedido no puede estar vacío",
      });
    }
    if (!product_id || !mov_quantity) {
      return res.status(400).json({
        status: 400,
        message: "El id del material y la cantidad no pueden estar vacíos",
      });
    }

    const newMovement = {
      mov_quantity,
      order_cod,
      product_id,
      mov_note,
    };

    const movementStored = await orderMovementServices.store(newMovement);

    if (!movementStored) {
      return res.status(500).json({
        status: 500,
        message: "no se pudo crear el movimiento",
      });
    }

    return res.status(201).json({
      status: 201,
      movementStored,
    });
  },
};

export default orderMovementController;

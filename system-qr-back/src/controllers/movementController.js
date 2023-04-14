import movementServices from "../services/movementServices.js";

const movementController = {
  store: async (req, res) => {
    const { product_id, operation_type_id, mov_quantity, operation_cod } =
      req.body;
    if (!product_id || !operation_type_id || !mov_quantity) {
      return res.status(400).json({
        status: 400,
        message:
          "El id del material, el tipo de operación, y la cantidad no pueden estar vacíos",
      });
    }

    const newMovement = {
      mov_quantity: operation_type_id === 1 ? mov_quantity : mov_quantity * -1,
      operation_cod,
      product_id,
      operation_type_id,
    };

    const movementStored = await movementServices.store(newMovement);

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
  deleteMovement: async (req, res) => {
    const { id } = req.body;

    const movementDeleted = await movementServices.deleteMovement(id);

    if (!movementDeleted) {
      return res.status(500).json({
        status: 500,
        message: "Error al eliminar la operacion en el servidor",
      });
    }
    return res.status(200).json({
      status: 200,
      deleted: true,
      message: "Operacion eliminada",
    });
  },
  findByOperationCod: async (req, res) => {
    const { operation_cod } = req.body;
    const movementFind = await movementServices.findByOperationCod(
      operation_cod
    );

    if (!movementFind) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: 200,
      movements: movementFind,
    });
  },
};

export default movementController;

import operationServices from "../services/operationServices.js";

const operationController = {
  findLastId: async (req, res) => {
    const operations = await operationServices.findLastId();

    let operationId;

    if (operations.length === 0) {
      operationId = 0;
    } else {
      operationId = operations[0].dataValues.id;
    }

    return res.status(200).json({
      status: 200,
      operationId,
    });
  },
  findInOperations: async (req, res) => {
    const operationsIn = await operationServices.findInOperations();

    return res.status(200).json({
      count: operationsIn.length,
      operations: operationsIn,
    });
  },
  findOutOperations: async (req, res) => {
    const operationsOut = await operationServices.findOutOperations();

    return res.status(200).json({
      count: operationsOut.length,
      operations: operationsOut,
    });
  },
  findOutOperationsById: async (req, res) => {
    const { id } = req.body;

    const operationsOut = await operationServices.findOutOperationsById(id);

    return res.status(200).json({
      count: operationsOut.length,
      operation: operationsOut,
    });
  },
  findInOperationsById: async (req, res) => {
    const { id } = req.body;

    const operationsOut = await operationServices.findInOperationsById(id);

    return res.status(200).json({
      count: operationsOut.length,
      operation: operationsOut,
    });
  },
  findOutOperationsByDepartment: async (req, res) => {
    const { department, warehouse } = req.body;

    if (!department || !warehouse) {
      res.status(400).json({
        status: 400,
        message: "El departamento o colegio no pueden estar vacíos",
      });
    }

    const operations = await operationServices.findOutOperationsByDepartment(
      department,
      warehouse
    );

    console.log(operations);
    if (operations.length <= 0) {
      res.status(200).json({
        status: 200,
        message: "No existen reportes con los datos introducidos",
      });
    }

    return res.status(200).json({
      status: 200,
      operations,
    });
  },
  deleteOperation: async (req, res) => {
    const { id } = req.body;

    const operationDeleted = await operationServices.deleteOperation(id);

    if (!operationDeleted) {
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
  countByType: async (req, res) => {
    const { operation_type_id } = req.body;

    if (!operation_type_id) {
      return res.status(400).json({
        status: 400,
        message: "debes indicar el tipo de operación",
      });
    }

    const totalOperations = await operationServices.countByType(
      operation_type_id
    );

    return res.status(200).json({
      status: 200,
      message: "operaciones encontradas",
      total: totalOperations,
    });
  },
  store: async (req, res) => {
    const { warehouse_out, u_make, dep_in, operation_type_id, warehouse_in } =
      req.body;

    if (!u_make || !operation_type_id) {
      res.status(400).json({
        status: 400,
        message: "faltan una o varias claves foraneas",
      });
    }

    const newOperation = {
      warehouse_out,
      u_make,
      dep_in,
      operation_type_id,
      warehouse_in,
    };

    const operationStored = await operationServices.store(newOperation);

    if (!operationStored) {
      return res.status(500).json({
        status: 500,
        message: "La operacion no pudo ser ejecutada",
      });
    }

    return res.status(201).json({
      status: 201,
      message: "Operacion creada",
      operation: operationStored,
    });
  },
  statusUpdate: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "el id no puede estar vacío",
      });
    }

    const operationUpdated = await operationServices.statusUpdate(id);

    if (operationUpdated.length <= 0) {
      return res.status(500).json({
        status: 500,
        message: "no se pudo actualizar la operación",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Materiales recibidos",
      operationUpdated,
    });
  },
};

export default operationController;

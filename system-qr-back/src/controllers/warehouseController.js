import warehouseServices from "../services/warehouseServices.js";

const warehouseController = {
  findAll: async (req, res) => {
    const allWarehouses = await warehouseServices.findAll();

    return res.status(200).json({
      status: 200,
      count: allWarehouses.length,
      allWarehouses: allWarehouses,
    });
  },
  findOneById: async (req, res) => {
    const { id } = req.params;

    if (!req.params.id) {
      res.status(400).json({
        status: 400,
        message: "no se encuentra el id en los parametros",
      });
    }

    const warehouseFind = await warehouseServices.findOneById(id);

    if (!warehouseFind) {
      return res
        .status(404)
        .json({ status: 404, message: "warehouse not found" });
    }
    return res.status(200).json({
      status: 201,
      warehouse: warehouseFind,
    });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { w_description } = req.body;
    if (!w_description) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "El nombre del colegio no puede estar vacío",
      });
    }

    const warehouse = {
      ...req.body,
      w_description: w_description.toUpperCase(),
    };

    const warehouseFound = await warehouseServices.findOneByDescription(
      w_description.toUpperCase()
    );

    if (warehouseFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        warehouseFound: true,
        message: `El colegio '${w_description}' ya se encuentra registrado en la base de datos`,
      });
    }
    const warehouseUpdate = await warehouseServices.update(id, warehouse);

    return res.status(200).json({
      status: 201,
      isUpdated: true,
      message: "El colegio fue actualizado",
      warehouse: warehouseUpdate,
    });
  },
  store: async (req, res) => {
    const { w_description } = req.body;

    if (!w_description) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "El nombre del colegio no puede estar vacío",
      });
    }

    const warehouseFound = await warehouseServices.findOneByDescription(
      w_description.toUpperCase()
    );
    if (warehouseFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        warehouseFound: true,
        message: `El colegio '${w_description}' ya se encuentra registrado en la base de datos`,
      });
    }

    const newWarehouse = {
      ...req.body,
      w_description: w_description.toUpperCase(),
    };

    const warehouseStored = await warehouseServices.store(newWarehouse);

    return res.status(201).json({
      status: 201,
      isStored: true,
      message: "el colegios fue agregado satisfactoriamente",
      warehouse: warehouseStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    if (!req.params.id) {
      return res.status(400).json({
        status: 400,
        isDeleted: false,
        message: "El id no puede estar vacío",
      });
    }

    const warehouseDeleted = await warehouseServices.delete(id);

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      product: warehouseDeleted,
      message: "El colegio fue eliminado",
    });
  },
};

export default warehouseController;

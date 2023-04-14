import departmentServices from "../services/departmentServices.js";
import Colors from "colors";

const departmentController = {
  findAll: async (req, res) => {
    const allDepartments = await departmentServices.findAll();
    return res.status(200).json({
      status: 200,
      count: allDepartments.length,
      allDepartments,
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
    const departmentFind = await departmentServices.findOnebyId(id);

    if (!departmentFind) {
      return res
        .status(404)
        .json({ status: 404, message: "departmento no encontrado" });
    }
    return res.status(200).json({
      status: 201,
      department: departmentFind,
    });
  },

  store: async (req, res) => {
    const { d_name } = req.body;

    if (!d_name) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: 'El campo "nombre" no puede estar vacío',
      });
    }

    const departmentFound = await departmentServices.findOneByName(
      d_name.toUpperCase()
    );

    if (departmentFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        departmentFound: true,
        message: `El departamento '${d_name}' ya se encuentra registrado en la base de datos`,
      });
    }

    const newDepartment = { ...req.body, d_name: d_name.toUpperCase() };

    const departmentStored = await departmentServices.store(newDepartment);

    return res.status(201).json({
      status: 201,
      isStored: true,
      message: "El departamento fue creado satisfactoriamente",
      department: departmentStored,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { d_name } = req.body;
    if (!d_name) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "El nombre del departamento no puede estar vacío",
      });
    }

    const department = {
      ...req.body,
      d_name: d_name.toUpperCase(),
    };

    const departmentFound = await departmentServices.findOneByName(
      d_name.toUpperCase()
    );

    if (departmentFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        departmentFound: true,
        message: `El departamento '${d_name}' ya se encuentra registrado en la base de datos`,
      });
    }
    const departmentUpdate = await departmentServices.update(id, department);

    return res.status(200).json({
      status: 201,
      isUpdated: true,
      message: "El departamento fue actualizado",
      department: departmentUpdate,
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

    const departmentDeleted = await departmentServices.delete(id);

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      department: departmentDeleted,
      message: "El departamento fue eliminado",
    });
  },
};

export default departmentController;

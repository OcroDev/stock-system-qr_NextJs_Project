import userServices from "../services/userServices.js";

const userController = {
  findAll: async (req, res) => {
    const users = await userServices.findAll();
    return res.status(200).json({
      status: 200,
      count: users.length,
      allUsers: users,
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

    const userFind = await userServices.findOnebyId(id);

    if (!userFind) {
      return res.status(404).json({ status: 404, message: "user not found" });
    }
    return res.status(200).json({
      status: 201,
      user: userFind,
    });
  },
  loginCheck: async (req, res) => {
    const { u_username, u_password } = req.body;

    if (!u_username || !u_password)
      return res(400).json({
        message: "El usuario y contraseña no deben estar vacíos",
      });

    const userFound = await userServices.findOneByName(
      u_username.toUpperCase()
    );

    if (userFound) {
      if (userFound.u_password === u_password) {
        return res.status(200).json({
          status: 200,
          message: "Iniciando Sesion",
          userFound,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "La contraseña es incorrecta",
          userNotFound: true,
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: `el usuario ${u_username} no se encuentra registrado`,
        userNotFound: true,
      });
    }
  },
  store: async (req, res) => {
    const { u_firstname, u_username, u_password, u_lastname, u_type } =
      req.body;

    if (!u_firstname) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: 'El campo "nombre" no puede estar vacío',
      });
    }

    if (!u_username || !u_password) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "el nombre de usuario y contraseña no puede estar vacío",
      });
    }
    if (!u_type) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "el tipo de usurio no puede estar vacío",
      });
    }

    const userFound = await userServices.findOneByName(
      u_username.toUpperCase()
    );

    if (userFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        userFound: true,
        message: `El usuario '${u_username}' ya se encuentra registrado en la base de datos`,
      });
    }

    const newUser = {
      ...req.body,
      u_username: u_username.toUpperCase(),
      u_firstname: u_firstname.toUpperCase(),
      u_lastname: u_lastname.toUpperCase(),
      u_type: u_type.toUpperCase(),
    };

    const userStored = await userServices.store(newUser);

    return res.status(201).json({
      status: 201,
      isStored: true,
      message: "El usuario fue creado satisfactoriamente",
      user: userStored,
    });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { u_firstname, u_password, u_username, u_lastname } = req.body;
    if (!u_firstname) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: 'El campo "nombre" no puede estar vacío',
      });
    }

    if (!u_username || !u_password) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "el nombre de usuario y contraseña no pueden estar vacío",
      });
    }

    const user = {
      ...req.body,
      u_username: u_username.toUpperCase(),
      u_firstname: u_firstname.toUpperCase(),
      u_lastname: u_lastname.toUpperCase(),
    };

    const userFound = await userServices.findOneByName(
      u_username.toUpperCase()
    );

    if (userFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        productFound: true,
        message: `El usuario '${u_username}' ya se encuentra registrado en la base de datos`,
      });
    }
    const userUpdate = await userServices.update(id, user);

    return res.status(200).json({
      status: 201,
      isUpdated: true,
      message: "El usuario fue actualizado",
      user: userUpdate,
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

    const userDeleted = await userServices.delete(id);

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      user: userDeleted,
      message: "El usuario fue eliminado",
    });
  },
};

export default userController;

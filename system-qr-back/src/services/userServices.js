import USER from "../models/users.js";

const userServices = {
  findAll: () => {
    try {
      const allUser = USER.findAll({ where: { isdeleted: false } });
      return allUser;
    } catch (error) {
      console.log(error);
    }
  },
  findOneByName: (username) => {
    try {
      return USER.findOne({ where: { u_username: username } });
    } catch (error) {
      console.log(error);
    }
  },
  findOnebyId: (userId) => {
    try {
      return USER.findByPk(userId);
    } catch (error) {
      console.log(error);
    }
  },
  update: (id, user) => {
    try {
      return USER.update(
        {
          u_firstname: user.u_firstname,
          u_lastname: user.u_lastname,
          u_username: user.u_username,
          u_password: user.u_password,
          u_admin: user.u_admin,
        },
        { where: { id: id } }
      );
    } catch (error) {
      console.log(error);
    }
  },
  store: (newUser) => {
    try {
      const user = USER.create(newUser);
      return user;
    } catch (error) {
      console.log(error);
    }
  },
  delete: (userId) => {
    try {
      return USER.update({ isdeleted: true }, { where: { id: userId } });
    } catch (error) {
      console.log(error);
    }
  },
};

export default userServices;

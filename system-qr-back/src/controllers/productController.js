import productServices from "../services/productServices.js";

const productController = {
  findAll: async (req, res) => {
    const allProducts = await productServices.findAll();

    return res.status(200).json({
      status: 200,
      count: allProducts.length,
      allProducts,
    });
  },

  store: async (req, res) => {
    const { p_description, p_unit, p_ubication } = req.body;

    if (!p_description || !p_ubication) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "El nombre y la ubicación del material no pueden estar vacíos",
      });
    }

    const productFound = await productServices.findOneByDescription(
      p_description.toUpperCase()
    );

    if (productFound) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        productFound: true,
        message: `El material '${p_description}' ya se encuentra registrado en la base de datos`,
      });
    }

    const newProduct = {
      ...req.body,
      p_description: p_description.toUpperCase(),
      p_unit: p_unit.toUpperCase(),
      p_ubication: p_ubication.toUpperCase(),
    };

    const productStored = await productServices.store(newProduct);

    return res.status(201).json({
      status: 201,
      isStored: true,
      message: "El material fue creado satisfactoriamente",
      product: productStored,
    });
  },
  findByID: async (req, res) => {
    const { id } = req.body;

    if (!req.body.id) {
      res.status(400).json({
        status: 400,
        message: "no se encuentra el id en los parametros",
      });
    }

    const productFind = await productServices.findOnebyId(id);

    if (!productFind) {
      return res
        .status(404)
        .json({ status: 404, message: "product not found" });
    }
    return res.status(200).json({
      status: 200,
      product: productFind,
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

    const productFind = await productServices.findOnebyId(id);

    if (!productFind) {
      return res
        .status(404)
        .json({ status: 404, message: "product not found" });
    }
    return res.status(200).json({
      status: 201,
      product: productFind,
    });
  },
  findByMinStock: async (req, res) => {
    const minstockProducts = await productServices.findByMinStock();

    return res.status(200).json({
      status: 200,
      products: minstockProducts,
    });
  },
  getMustOut: async (req, res) => {
    const productsMustOut = await productServices.getMustOut();
    return res.status(200).json({
      status: 200,
      products: productsMustOut,
    });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { p_description, p_unit, p_ubication } = req.body;
    if (!p_description || !p_ubication) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: "El nombre y la ubicación del material no pueden estar vacíos",
      });
    }

    const product = {
      ...req.body,
      p_description: p_description.toUpperCase(),
      p_unit: p_unit.toUpperCase(),
      p_ubication: p_ubication.toUpperCase(),
    };

    const productUpdate = await productServices.update(id, product);

    return res.status(200).json({
      status: 201,
      isUpdated: true,
      message: "El material fue actualizado",
      product: productUpdate,
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

    const productDeleted = await productServices.delete(id);

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      product: productDeleted,
      message: "El material fue eliminado",
    });
  },
  updateStock: async (req, res) => {
    let { id, p_stock, operation_type } = req.body;

    if (operation_type === 2) {
      p_stock *= -1;
    }
    const productFind = await productServices.findOnebyId(id);

    if (!productFind) {
      return res.status(404).json({
        status: 404,
        message: "No se pudo encontrar el material",
      });
    }
    let stock = parseInt(productFind.p_stock) + parseInt(p_stock);

    const productUpdate = await productServices.updateStock(id, stock);

    return res.status(200).json({
      status: 200,
      message: "stock del material actualizado",
      product: productUpdate,
    });
  },
};

export default productController;

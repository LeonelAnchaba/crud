const { setJson, getJson } = require("../utility/jsonMethod");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", {
      products: getJson("productsDataBase"),
      toThousand,
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    const { id } = req.params;
    const products = getJson("productsDataBase");
    const product = products.find((producto) => producto.id == id);

    res.render("detail", { product, toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    const archivoJson = getJson("productsDataBase");
    const id = archivoJson[archivoJson.length - 1].id + 1;

    const { name, price, discount, category, description } = req.body;

    let newObjeto = {
      id,
      name,
      price: +price,
      discount: +discount,
      category,
      description,
      image: "default-image.png",
    };
    let newArchivo = [...archivoJson, newObjeto];
    setJson(newArchivo, "productsDataBase");
    res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const { id } = req.params;
    const products = getJson("productsDataBase");
    const product = products.find((producto) => producto.id == id);
    res.render("product-edit-form", { product });
  },
  // Update - Method to update
  update: (req, res) => {
    const { id } = req.params;
    const products = getJson("productsDataBase");
    const { name, price, discount, category, description, image } = req.body;
    const nuevoArray = products.map((product) => {
      if (product.id == id) {
        return {
          id: +id,
          name: name.trim(),
          price: +price,
          discount: +discount,
          category,
          description: description.trim(),
          image: image ? image : product.image,
        };
      }
      return product;
    });
    setJson(nuevoArray, "productsDataBase");
    res.redirect(`/products/${id}`);
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    res.send("Producto borrado correctamente")
  },
};

module.exports = controller;

const { setJson, getJson } = require("../utility/jsonMethod");
const fs = require("fs")

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
    const file = req.file
    const archivoJson = getJson("productsDataBase");
    const id = archivoJson[archivoJson.length - 1].id + 1;


    const { name, price, discount, category, description } = req.body;
    // if(!file) {
    //   const error = new Error("Por favor seleccione un archivo")
    //   error.httpStatusCode = 400
    //   res.send(error)
    // }

    let newObjeto = {
      id,
      name,
      price: +price,
      discount: +discount,
      category,
      description,
      image: file ? file.filename : "default-image.png",

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
    const file = req.file
    const { id } = req.params;
    const products = getJson("productsDataBase");
    const { name, price, discount, category, description } = req.body;
    const nuevoArray = products.map((product) => {
      if (product.id == id) {
        return {
          id: +id,
          name: name.trim(),
          price: +price,
          discount: +discount,
          category,
          description: description.trim(),
          image: file ? file.filename : product.image,
        };
      }
      return product;
    });

    setJson(nuevoArray, "productsDataBase");
    res.redirect(`/products/${id}`);
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const { id } = req.params;
    const archivoJson = getJson("productsDataBase");
    const product = archivoJson.find(producto => producto.id == id);

    //con fs vamos a borrar la imagen antes de borrar el articulo, para no perder la referencia


    const productosRestantes = archivoJson.filter(product => product.id != id);
    // product.images.forEach(imagen => {
    //   fs.unlink(`../../public/images/products/${imagen}`)
    // })
    fs.unlink(`./public/images/products/${product.image}`, (err) => {
      if (err) throw err
      console.log("Archivo borrado")
    })
    setJson(productosRestantes, "productsDataBase");
    res.redirect("/products");
  },
};

module.exports = controller;

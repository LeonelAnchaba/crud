const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
	const {id} = req.params
	const product = products.find(producto => producto.id == id)

	const dtoReal = product.price * product.discount / 100

	const finalPrice = product.price - dtoReal
	
	res.render('detail',{product, finalPrice})
},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
		const products = get.Json("products");
		const newArrayProducts = products.filter(producto => producto.id != id);
		setJson = (newArrayProducts, "products")
		res.redirect("products/dashboard") 
	}
};

module.exports = controller;
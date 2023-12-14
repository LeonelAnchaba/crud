const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
	const {id} = req.params	
	const product = products.find(producto => producto.id == id)

	res.render('detail',{product, toThousand})
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
		 const {id} = req.params
		 const product = products.find(producto => producto.id == id)
		 res.render('product-edit-form',{product})

	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params
		const {name, price, discount, category, description, image} = req.body
		const nuevoArray = products.map(product => {
			if(product.id == id){
				return{
					id,
					name: name.trim(),
					price,
					discount,
					category,
					description: description.trim(),
					image: image ? image : product.image
				}
			}
			return product
		})
		const json = JSON.stringify(nuevoArray)
		fs.writeFileSync(productsFilePath, json, "utf-8")
		res.redirect("/products/detail/")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
		const products = get.Json("products");
		const newArrayProducts = products.filter(producto => producto.id != id);
		setJson = (newArrayProducts, "products")
		res.redirect(`products/dashboard/${id}`) 
	}
};

module.exports = controller;
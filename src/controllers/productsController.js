const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const getJson = ()=>{
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
	const {id} = req.params	
	const products = getJson()
	const product = products.find(producto => producto.id == id)

	res.render('detail',{product, toThousand})
},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
        
       
        const archivoJson = getJson("productsDataBase")
        const id = archivoJson[archivoJson.length-1].id + 1

        const {name, price, discount, category, description} = req.body

        let newObjeto = {
            id,
            name,
            price: +price,
            discount: +discount,
            category,
			description,
			image: "default-image.png"
		
        } 

        let newArchivo = [...archivoJson, newObjeto]
		const guardarArchivo = (newArray, nameFile)=> {
			const pathFile = path.join(__dirname,  "../data/productsDataBase.json")
			let datosJson = JSON.stringify(newArray) 
			fs.writeFileSync(pathFile, datosJson, "utf-8")
		}
        guardarArchivo(newArchivo, "productsDataBase")
        res.redirect("/products")
    },

	// Update - Form to edit
	edit: (req, res) => {
		 const {id} = req.params
		 const products = getJson()
		 const product = products.find(producto => producto.id == id)
		 res.render('product-edit-form',{product})

	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params
		const products = getJson()
		const {name, price, discount, category, description, image} = req.body
		const nuevoArray = products.map(product => {
			if(product.id == id){
				return{
					id: +id,
					name: name.trim(),
					price: +price,
					discount: +discount,
					category,
					description: description.trim(),
					image: image ? image : product.image
				}
			}
			return product
		})
		const json = JSON.stringify(nuevoArray)
		fs.writeFileSync(productsFilePath, json, "utf-8")
		res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	// destroy : (req, res) => {
    //    const {id} = req.params;
    //    const products = getJson("productsDataBase");
    //    const newArrayProducts = products.filter(producto => producto.id != id);
    //    console.log("newArrayProducts",newArrayProducts);
	//    const setJson = (array,fileName) => {
	// 	const json = JSON.stringify(array);
	// 	fs.writeFileSync(`${__dirname}/../data/${fileName}.json`,json,"utf-8")
	// }
    //    setJson(newArrayProducts,"productsDataBase");
    //    res.redirect("/products");
    //  },
};

module.exports = controller;
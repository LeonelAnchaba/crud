const {getJson} = require("../utility/jsonMethod");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	index: (req, res) => {
		res.render('index',{products:getJson("productsDataBase"), toThousand})
	},
	search: (req, res) => {
		const {keywords} = req.query;
		console.log(keywords)
		
		res.render('results',{products:getJson("productsDataBase"), toThousand, keywords})
	 }
	}

module.exports = controller;

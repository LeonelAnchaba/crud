// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname, "../../public/images/products"))
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}` )
    }
})

//Inicializamos el multer guardandolo en una variable
const uploadFile = multer({ storage})

// ************ Controller Require ************
const {index, create, store, detail, edit, update, destroy} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/', uploadFile.single("image"), store); 
//. single indica que se va a guardar lo que le pases, lo cual es un solo archivo; 
//.any() guarda lo que llega, no es recomendado
//entre los parentesis le indicamos a que propiedad del Json debe ir a buscar




/*** GET ONE PRODUCT ***/ 
router.get('/:id', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/:id', uploadFile.single("image"), update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', destroy); 


module.exports = router;

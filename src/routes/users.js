// ************ Require's ************
const express = require('express');
const router = express.Router();
const { check } = require("express-validator")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/users"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const uploadFile = multer({ storage })


const validateRegister = [
    check('name')
        .notEmpty().withMessage('Debe completar su nombre').bail()
        .isLength({ min: 3 }).withMessage('Su nombre debe contar al menos con 3 caracteres'),
    check("surname")
        .notEmpty().withMessage('Debe completar su apellido').bail()
        .isLength({ min: 3 }).withMessage('Su apellido debe contar al menos con 3 caracteres'),
    check("email")
        .notEmpty().withMessage("Debe ingresar su email").bail()
        .isEmail().withMessage("El mail ingresado no es válido"),
    check("password")
        .notEmpty().withMessage("Debe completar su contraseña").bail()
        .isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres"),
    check("image")
        .custom((value, { req }) => {
            let file = req.file
            let acceptedExtensions = [".jpg", ".png", ".gif"];
            if (file) {
                let fileExtension = path.extname(file.originalname)
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("Los formatos aceptados son " + acceptedExtensions.join(", "))
                }
            }

            return true
        })
];

// ************ Controller Require ************
const { formRegister, register } = require('../controllers/usersController');

router.get('/register', formRegister);
// uploadFile.single("image")
router.post('/register', uploadFile.single("image"), validateRegister, register);

module.exports = router;
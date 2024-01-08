const { setJson, getJson } = require("../utility/jsonMethod");
const fs = require("fs")
const {validationResult} = require("express-validator")

const usersController = {
    formRegister:(req,res)=>{
        res.render('register',{title:"Registro"})
        
    },
    register:  (req, res) => {
        const resultValidation = validationResult(req)
        
        if (resultValidation.isEmpty()){
            const file = req.file
            const archivoJson = getJson("usersDataBase");
           
        
            const { name, surname, email, password} = req.body;
             
           
                let newUser = {
                  name,
                  surname,
                  email,
                  password, 
                  image: file ? file.filename : "default-avatar-profile.jpg",
                 
                };
             
                let newArchivo = [...archivoJson, newUser];
                setJson(newArchivo, "usersDataBase");
                res.redirect("/");
        } else {
            res.render('register', {
                 
                errors: resultValidation.mapped(), 
                oldData: req.body,
                title:"Error"
            });
          
        }
        
        
    },

}
module.exports = usersController;
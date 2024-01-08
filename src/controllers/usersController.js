const { setJson, getJson } = require("../utility/jsonMethod");
const fs = require("fs")

const usersController = {
    formRegister:(req,res)=>{
        res.render('register',{title:"Registro"})
        
    },
    // register:(req,res) => {
    //      console.log(req.body)
    //      res.redirect("/")
    register:  (req, res) => {
        const archivoJson = getJson("usersDataBase");
           
        
        const { name, surname, email, password} = req.body;
          
        
            let newUser = {
              name,
              surname,
              email,
              password
              
            };
          
            let newArchivo = [...archivoJson, newUser];
            setJson(newArchivo, "usersDataBase");
            res.redirect("/");
        
    },

}
module.exports = usersController;
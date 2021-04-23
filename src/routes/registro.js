const express = require('express')
const registroRouter = express.Router()
const axios = require('axios')

registroRouter.get('', (req,res)=>{

    res.render("registro")
//res.render('usuarios')
});

registroRouter.post('',(req, res) =>{
    const { nombre, id, email, password  } = req.body


    axios.post('http://localhost:3001/api/createUser', { 
        id: id,
        nombre: nombre,
        password: password,
        email: email
        })
        .then(function (response) {
            console.log(response);
        })

    //res.redirect('home')
    res.redirect('/')
})


module.exports = registroRouter
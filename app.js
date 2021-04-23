const express = require('express')
app = express()
const port = 8080
const axios = require('axios')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initPassport = require('./passport-config')

//Static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))

//Template engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

//middleware para poder recuperar los datos de form
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Configuración Passport
initPassport(passport)
app.use(flash())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', validaAutentificacion, (req, res) => {
    res.render('inicio', {user: req.user})
})

//crear cuenta
app.get('/crear_cuenta', (req,res) =>{
    res.render('crear_cuenta')
});

app.get('/iniciar_sesion',(req, res) =>{
    res.render('iniciar_sesion')
})

app.post('/iniciar_sesion', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar_sesion',
    failureFlash: true
}))

//juego
app.get('/juego', (req,res) =>{
    res.render('juego')
});
//sobre ternium
app.get('/sobre_ternium', (req,res) =>{
    res.render('sobre_ternium')
});
//proceso
app.get('/proceso', (req,res) =>{
    res.render('proceso')
});
//usuario
const usuariosRouter = require('./src/routes/usuario')
app.use('/usuario', usuariosRouter)

//estadisticas
app.get('/estadisticas', (req,res) =>{
    res.render('estadisticas')
});
//estadisticas individuales
app.get('/estad_indiv', (req,res) =>{
    res.render('estad_indiv')
});
//registro
app.get('/registro', (req,res) =>{
    res.render('registro')
});
//creadores
app.get('/creadores', (req,res) =>{
    res.render('creadores')
});
//tabla de puntos vista admin
app.get('/admin_tabla_puntos', (req,res) =>{
    res.render('admin_tabla_puntos')
});
//tabla de puntos vista admin
app.get('/chart', (req,res) =>{
    res.render('chart')
});

app.post('/registro', async (req, res) =>{
    const { nombre, id, email, password } = req.body
    console.log(id)
    console.log(nombre)
    console.log(password)
    console.log(email)

    await axios.post('http://localhost:3001/api/createUser', { 
        id: id,
        nombre: nombre,
        password: password,
        email: email
      })
      .then(function (response) {
        console.log(response);
      })

    //res.redirect('home')
    //res.send("inicio")
    res.render('inicio')
})

function validaAutentificacion(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('iniciar_sesion')
}

app.listen(port, ()=>console.log(`Escuchando en el puerto ${port}`))
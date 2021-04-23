const express = require('express')
app = express()
const port = 8000
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

app.get('/', (req,res ) => {
    res.send("inicio")
})

app.get('/iniciar_sesion',(req, res) =>{
    res.render('iniciar_sesion', {user: req.user})
})

app.post('/iniciar_sesion', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar_sesion',
    failureFlash: true
}))

app.listen(port, ()=>console.log(`Escuchando en el puerto ${port}`))
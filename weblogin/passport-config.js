const LocalStrategy = require('passport-local').Strategy
const axios = require('axios')

function initPassport(passport){

const authenticateUser= async (email, password, done) =>{
    try{

        const resp =  await axios.get(`http://localhost:3001/api/getUserByUserName/${username}`)
        
        const user = resp.data[0]

        
        if (user == null){
            return done(null, false, {message: 'Usuario no encontrado'})
        }
        else {
            if ( user.password == password ){
                return done(null, user)
            }
            else{
                return done(null, false, {message:'Password incorrecto'})
            }
        }
        
    }
    catch(err){
        console.log(err)
        return done(err)
    }
}

    passport.use(new LocalStrategy( {usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user,done)=>{ done(null, user.email)} )
    passport.deserializeUser((id,done)=>{ getUserByEmail(email, done)})
}

const getUserById = async (id, done) =>{
        
    try{

        const resp =  await axios.get(`http://localhost:3001/api/getUser/${id}`)
        const user = resp.data[0]

        console.log('user.user_name ' + user.user_name)
        
        if (user == null){
            return done(null, false)
        }
        else{
            return done(null, user)
        }
    }
    catch(err){
        console.log(err)
        return done(err)
    }

}

module.exports = initPassport
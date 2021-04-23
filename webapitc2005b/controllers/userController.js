// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getUsuarios(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPLoadUsers")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUsuario(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('usuarioID',sql.VarChar, req.params.id)
            .query("exec SPLoadUser @id = @usuarioID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addUsuario(req , res){
      try {
        if(req.body.id != null && req.body.password != null && req.body.nombre != null && req.body.email != null && req.body.tipo != null && req.body.id_grupo != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.VarChar, req.body.id)
          .input('usuarioName',sql.VarChar, req.body.nombre)
          .input('usuarioPassword',sql.VarChar, req.body.password)
          .input('usuarioMail',sql.VarChar, req.body.email)
          .input('groupID',sql.Int, req.body.id_grupo)
          .input('usuariotypeID',sql.VarChar, req.body.tipo)
          .input('usuarioEstatus',sql.VarChar, req.body.estatus)
          .query("exec SPAddUser @id= @usuarioID, @password = @UsuarioPassword, @nombre = @usuarioName, @email = @usuarioMail, @estatus= @usuarioEstatus, @tipo = @usuariotypeID, @id_grupo = @groupID")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async createUser(req , res){ 
      try {
        if(req.body.id != null && req.body.password != null && req.body.nombre != null && req.body.email != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.VarChar, req.body.id)
          .input('usuarioName',sql.VarChar, req.body.nombre)
          .input('usuarioPassword',sql.VarChar, req.body.password)
          .input('usuarioMail',sql.VarChar, req.body.email)
          .query("exec SPCreateUser @id= @usuarioID, @password = @UsuarioPassword, @nombre = @usuarioName, @email = @usuarioMail")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateUsuario(req, res){
      try {
        if(req.body.nombre != null && req.body.id_grupo != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.VarChar, req.params.id)
          .input('groupID',sql.Int, req.body.id_grupo)
          .query("exec SPUpdateUserGroup @id = @usuarioID, @id_grupo = @groupID")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    //async updateUsuarioPassword(req, res){
      //try {
        //if(req.body.password != null) {
          /*const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.Int, req.params.id)
          .input('newPassword',sql.VarChar, req.body.password)
          .query("exec SPUpdateUsuarioPassword @id = @usuarioID, @password = @newPassword")
          res.json(result)
        //} else {
         // res.send('Todos los campos obligatorios!')
       // }
      //} catch (error) {
        //res.status(500)
        //res.send(error.message)
      //}
    //}
    async updateUsuarioLastLogin(req, res){
      try {
        if(req.body.last_login != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.Int, req.params.usuario_id)
          .input('newLastLogin',sql.DateTime, req.body.last_login)
          .query("exec SPUpdateUsuarioLastLogin @usuario_id = @usuarioID, @last_login = @newLastLogin")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }*/
    async deleteUsuario(req , res){
      try {
        if(req.params.id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('usuarioID',sql.VarChar, req.params.id)
            .query("exec SPLoadUser @id = @usuarioID")
            res.json(result)
          } else {
            res.send('Agrega el id del usuario!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUserbyEmail(req , res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .input('email',sql.VarChar, req.params.email)
          .query("exec SPLoadUserByEmail @email = @email")
          res.json(result.recordset)
      } catch (error) {
          res.status(500)
          res.send(error.message)
      }
  }

}

const userController = new MainController()
module.exports = userController;
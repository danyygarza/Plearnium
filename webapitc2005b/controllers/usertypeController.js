// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getUserTypes(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPLoadUserTypes")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUserType(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('usertypeID',sql.Int, req.params.user_type_id)
            .query("exec SPLoadUserType @user_type_id = @usertypeID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addUserType(req , res){
      try {
        if(req.body.user_type_desc != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usertypeID',sql.Int, req.body.user_type_id)
          .input('usertypeDesc',sql.VarChar, req.body.user_type_desc)
          .query("exec SPAddUserType @user_type_desc = @usertypeDesc")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateUserType(req, res){
      try {
        if(req.body.user_type_desc != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usertypeID',sql.Int, req.params.user_type_id)
          .input('usertypeDesc',sql.VarChar, req.body.user_type_desc)
          .query("exec SPUpdateUserType @user_type_id = @usertypeID, @user_type_desc = @usertypeDesc")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteUserType(req , res){
      try {
        if(req.params.user_type_id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('usertypeID',sql.Int, req.params.user_type_id)
            .query("exec SPDeleteUserType @user_type_id = @usertypeID")
            res.json(result)
          } else {
            res.send('Agrega el id del nivel!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const usertypeController = new MainController()
module.exports = usertypeController;
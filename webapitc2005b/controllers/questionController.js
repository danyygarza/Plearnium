// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getQuestions(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPQQuestions")  
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getQuestion(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('questionID',sql.Int, req.params.question_id)
            .query("exec SPQQuestion @question_id = @questionID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addQuestion(req , res){
      try {
        if(req.body.level_id != null && req.body.group_id != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('questionID',sql.Int, req.body.question_id)
          .input('levelID',sql.Int, req.body.level_id)
          .input('groupID',sql.Int, req.body.group_id)
          .input('questionDesc',sql.VarChar, req.body.question_desc)
          .input('questionImage',sql.VarChar, req.body.question_image)
          .query("exec SPIQuestion @level_id = @levelID, @group_id = @groupID, @question_desc = @questionDesc, @question_image = @questionImage")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateQuestion(req, res){
      try {
        if(req.body.level_id != null && req.body.group_id != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('questionID',sql.Int, req.body.question_id)
          .input('levelID',sql.Int, req.body.level_id)
          .input('groupID',sql.Int, req.body.group_id)
          .input('questionDesc',sql.VarChar, req.body.question_desc)
          .input('questionImage',sql.VarChar, req.body.question_image)
          .query("exec SPUQuestion @question_id = @questionID, @level_id = @levelID, @group_id = @groupID, @question_desc = @questionDesc, @question_image = @questionImage")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteQuestion(req , res){
      try {
        if(req.params.question_id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('questionID',sql.Int, req.params.question_id)
            .query("exec SPDQuestion @question_id = @questionID")
            res.json(result)
          } else {
            res.send('Agrega el id de la pregunta!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const questionController = new MainController()
module.exports = questionController;
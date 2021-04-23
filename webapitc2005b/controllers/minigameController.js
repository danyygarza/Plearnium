// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getMiniGames(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPLoadMiniGames")  
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getMiniGame(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('minigameID',sql.Int, req.params.minigame_id)
            .query("exec SPLoadMiniGame @minigame_id = @minigameID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addMiniGame(req , res){
      try {
        if(req.body.minigame_name != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('minigameID',sql.Int, req.body.minigame_id)
          .input('minigameName',sql.VarChar, req.body.minigame_name)
          .input('minigameImage',sql.VarChar, req.body.minigame_image)
          .query("exec SPAddMiniGame @minigame_name = @minigameName, @minigame_image = @minigameImage")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateMiniGame(req, res){
      try {
        if(req.body.minigame_name != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('minigameID',sql.Int, req.params.minigame_id)
          .input('minigameName',sql.VarChar, req.body.minigame_name)
          .input('minigameImage',sql.VarChar, req.body.minigame_image)
          .query("exec SPUpdateMiniGame @minigame_id = @minigameID, @minigame_name = @minigameName, @minigame_image = @minigameImage")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deleteMiniGame(req , res){
      try {
        if(req.params.minigame_id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('minigameID',sql.Int, req.params.minigame_id)
            .query("exec SPDeleteMiniGame @minigame_id = @minigameID")
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

const minigameController = new MainController()
module.exports = minigameController;
// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async loadUserProgress(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('userID',sql.Int, req.params.user_id)
            .input('levelID',sql.Int, req.params.level_id)
            .input('groupID',sql.Int, req.params.group_id)
            .query("exec SPLoadGameProgress @user_id = @userID, @level_id = @levelID, @group_id = @groupID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateUserProgress(req, res){
      try {
        if(req.body.minigame_1 != null && req.body.minigame_2 != null && req.body.minigame_3 != null && req.body.minigame_4 != null && req.body.minigame_5 != null && req.body.minigame_6 != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('userID',sql.Int , req.params.user_id)
          .input('levelID',sql.Int, req.params.level_id)
          .input('groupID',sql.Int, req.params.group_id)
          .input('newMinigame1',sql.Bit, req.body.minigame_1)
          .input('newMinigame1Image',sql.VarChar, req.body.minigame_1_image)
          .input('newMinigame1DocID',sql.Int, req.body.minigame_1_document_id)
          .input('newMinigame2',sql.Bit, req.body.minigame_2)
          .input('newMinigame2Image',sql.VarChar, req.body.minigame_2_image)
          .input('newMinigame2DocID',sql.Int, req.body.minigame_2_document_id)
          .input('newMinigame3',sql.Bit, req.body.minigame_3)
          .input('newMinigame3Image',sql.VarChar, req.body.minigame_3_image)
          .input('newMinigame3DocID',sql.Int, req.body.minigame_3_document_id)
          .input('newMinigame4',sql.Bit, req.body.minigame_4)
          .input('newMinigame4Image',sql.VarChar, req.body.minigame_4_image)
          .input('newMinigame4DocID',sql.Int, req.body.minigame_4_document_id)
          .input('newMinigame5',sql.Bit, req.body.minigame_5)
          .input('newMinigame5Image',sql.VarChar, req.body.minigame_5_image)
          .input('newMinigame5DocID',sql.Int, req.body.minigame_5_document_id)
          .input('newMinigame6',sql.Bit, req.body.minigame_6)
          .input('newMinigame6Image',sql.VarChar, req.body.minigame_6_image)
          .input('newMinigame6DocID',sql.Int, req.body.minigame_6_document_id)
          .query("exec SPUpdateGameProgress @user_id = @userID, @level_id = @levelID, @group_id = @groupID, @minigame_1 = @newMinigame1, @minigame_1_image = @newMinigame1Image, @minigame_1_document_id = @newMinigame1DocID, @minigame_2 = @newMinigame2, @minigame_2_image = @newMinigame2Image, @minigame_2_document_id = @newMinigame2DocID, @minigame_3 = @newMinigame3, @minigame_3_image = @newMinigame3Image, @minigame_3_document_id = @newMinigame3DocID, @minigame_4 = @newMinigame4, @minigame_4_image = @newMinigame4Image, @minigame_4_document_id = @newMinigame4DocID, @minigame_5 = @newMinigame5, @minigame_5_image = @newMinigame5Image, @minigame_5_document_id = @newMinigame5DocID, @minigame_6 = @newMinigame6, @minigame_6_image = @newMinigame6Image, @minigame_6_document_id = @newMinigame6DocID")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async loadMemoryGameProgress(req , res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .input('userID',sql.Int, req.params.user_id)
          .input('levelID',sql.Int, req.params.level_id)
          .input('groupID',sql.Int, req.params.group_id)
          .query("exec SPLoadMemoryGameProgress @user_id = @userID, @level_id = @levelID, @group_id = @groupID")
          res.json(result.recordset)
      } catch (error) {
          res.status(500)
          res.send(error.message)
      }
    }
    async updateMemoryGameProgress(req, res){
      try {
        if(req.body.minigame_1 != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('userID',sql.Int , req.params.user_id)
          .input('levelID',sql.Int, req.params.level_id)
          .input('groupID',sql.Int, req.params.group_id)
          .input('newMinigame1',sql.Bit, req.body.minigame_1)
          .query("exec SPUpdateMemoryGameProgress @user_id = @userID, @level_id = @levelID, @group_id = @groupID, @minigame_1 = @newMinigame1")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const gameController = new MainController()
module.exports = gameController;
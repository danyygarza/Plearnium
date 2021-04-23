// import express from 'express'

const { sql, poolPromise } = require('../database/db')

class MainController {

  async getPlayers(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query("exec SPLoadPlayers")
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getRanking(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query("exec SPGetRanking")
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getJugador(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .input('playerID', sql.Int, req.params.id)
        .query("exec SPLoadPlayer @id = @playerID")
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async addPlayer(req, res) {
    try {
      if (req.body.user_id != null && req.body.player_name != null && req.body.level_id != null && req.body.avatar_id != null && req.body.points != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('userID', sql.Int, req.body.user_id)
          .input('playerName', sql.VarChar, req.body.player_name)
          .input('levelID', sql.Int, req.body.level_id)
          .input('avatarID', sql.Int, req.body.avatar_id)
          .input('points', sql.Int, req.body.points)
          .query("exec SPAddPlayer @user_id = @UserId, @player_name = @playerName, @level_id = @levelID, @avatar_id = @avatarID, @points = @points")
        res.json(result)
      } else {
        res.send('Por favor llena todos los datos!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updatePlayer(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('playerID', sql.VarChar, req.params.id)
          .input('playerColor', sql.VarChar, req.body.color)
          .input('playerPoints', sql.Int, req.body.puntaje)
          .query("exec SPUpdatePlayer @id = @playerID, @color = @playerColor, @puntaje = @playerPoints")
        res.json(result)
      } else {
        res.send('Todos los campos obligatorios!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deletePlayer(req, res) {
    try {
      if (req.params.player_id != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('playerID', sql.Int, req.params.player_id)
          .query("exec SPDeletePlayer @player_id = @playerID")
        res.json(result)
      } else {
        res.send('Agrega el id del jugador!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const playerController = new MainController()
module.exports = playerController;
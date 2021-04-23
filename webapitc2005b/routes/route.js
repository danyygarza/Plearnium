const express = require('express');
const userController = require('../controllers/userController')
const playerController = require('../controllers/playerController')
const usertypeController = require('../controllers/usertypeController')
const minigameController = require('../controllers/minigameController')
const acomodaController = require('../controllers/acomodaController')

const router = express.Router();
router.get('/api/getUsuarios', userController.getUsuarios);
router.get('/api/getUsuario/:id', userController.getUsuario);
router.get('/api/getUserbyEmail/:email', userController.getUserbyEmail);
router.post('/api/addUsuario', userController.addUsuario);
router.post('/api/createUser', userController.createUser);
router.put('/api/updateUsuario/:id', userController.updateUsuario);
//router.put('/api/updateUserPassword/:user_id', userController.updateUserPassword);
//router.put('/api/updateUserLastLogin/:user_id', userController.updateUserLastLogin);
router.delete('/api/deleteUsuario/:id', userController.deleteUsuario);
router.get('/api/getPlayers', playerController.getPlayers);
router.get('/api/getRanking', playerController.getRanking);
router.get('/api/getJugador/:id', playerController.getJugador);
router.post('/api/addPlayer', playerController.addPlayer);
router.put('/api/updatePlayer/:id', playerController.updatePlayer);
router.delete('/api/deletePlayer/:player_id', playerController.deletePlayer);
router.get('/api/getUserTypes', usertypeController.getUserTypes);
router.get('/api/getUserType/:user_type_id', usertypeController.getUserType);
router.post('/api/addUserType', usertypeController.addUserType);
router.put('/api/updateUserType/:user_type_id', usertypeController.updateUserType);
router.delete('/api/deleteUserType/:user_type_id', usertypeController.deleteUserType);
router.get('/api/getMiniGames', minigameController.getMiniGames);
router.get('/api/getMiniGame/:minigame_id', minigameController.getMiniGame);
router.post('/api/addMiniGame', minigameController.addMiniGame);
router.put('/api/updateMiniGame/:minigame_id', minigameController.updateMiniGame);
router.delete('/api/deleteMiniGame/:minigame_id', minigameController.deleteMiniGame);
router.get('/api/cargaAcomoda/:id_proceso', acomodaController.cargaAcomoda);


module.exports = router;
const express = require("express");
//const currentUser = require('../middlewars/currentUser');
const petController = require("../controllers/petController");
const authControler = require("../controllers/authController");



const router = express.Router();

router.get('/api/pets', petController.getPets);

router.get('/api/pets/pet/:id', petController.getPet);

router.post('/api/pets/new-pet', authControler.onlineUser,petController.createPet);

router.put('/api/pets/update-pet/:id', authControler.onlineUser, petController.updatePet);

router.delete('api/pets/delete-pet/:id', authControler.onlineUser,petController.deletePet);

module.exports = router;


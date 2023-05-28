import e = require("cors");
import express = require("express");
const router = express.Router();

import {
  createAnimal,
  deleteAnimal,
  getAnimalsByUser,
  getAdoptionAnimals,
  getAdoptionAnimalsCount,
} from "../services/AnimalService";

router.post("/api/createAnimal", createAnimal);

router.get("/api/getAnimalsByUserId", getAnimalsByUser);

router.delete("/api/deleteAnimal", deleteAnimal);

router.get("/api/getAdoptionAnimals", getAdoptionAnimals);

router.get("/api/getAdoptionAnimalsCount", getAdoptionAnimalsCount);

module.exports = router;

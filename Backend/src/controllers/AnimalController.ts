import e = require("cors");
import express = require("express");
const router = express.Router();

import {
  createAnimal,
  deleteAnimal,
  getAnimalsByUser,
  getAdoptionOrFindMateAnimals,
  getAdoptionOrFindMateAnimalsCount,
  generatePotentialMathes,
} from "../services/AnimalService";

router.post("/api/createAnimal", createAnimal);

router.get("/api/getAnimalsByUserId", getAnimalsByUser);

router.delete("/api/deleteAnimal", deleteAnimal);

router.get("/api/getAdoptionOrFindMateAnimals", getAdoptionOrFindMateAnimals);

router.get(
  "/api/getAdoptionOrFindMateAnimalsCount",
  getAdoptionOrFindMateAnimalsCount
);

router.get("/api/getPossibleMatches", generatePotentialMathes);

module.exports = router;

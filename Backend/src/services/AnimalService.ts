import { AppDataSource } from "../app-data-source";
import { Animal } from "../entities/Animal";
import { Request, Response } from "express";
import User from "../entities/User";
import jwt = require("jsonwebtoken");
import {
  convertAnimalTypeToString,
  convertSexToString,
} from "../utils/AnimalsHelperFunctions";
import { Not } from "typeorm";

export const createAnimal = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    const {
      name,
      breed,
      age,
      animalType,
      sex,
      weight,
      details,
      image1,
      image2,
      image3,
      forAdoption,
    } = req.body;

    const animal = new Animal();
    animal.name = name;
    animal.breed = breed;
    animal.age = age;
    animal.animalType = convertAnimalTypeToString(animalType);
    animal.sex = convertSexToString(sex);
    animal.weight = weight;
    animal.details = details;
    animal.image1 = image1;
    animal.image2 = image2;
    animal.image3 = image3;
    animal.forAdoption = forAdoption;

    console.log(animalType);
    console.log(sex);
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    animal.user = user;

    const animalRepository = AppDataSource.getRepository(Animal);
    const savedAnimal = await animalRepository.save(animal);

    return res.status(201).json(savedAnimal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create animal" });
  }
};

export const getAnimalsByUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const utilityType = req.query.utilityType;
  let forAdoption: boolean | undefined;

  if (utilityType === "adoption") {
    forAdoption = true;
  } else if (utilityType === "findMate") {
    forAdoption = false;
  }

  try {
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    let animals;
    if (utilityType && (forAdoption === true || forAdoption === false)) {
      animals = await AppDataSource.getRepository(Animal).find({
        relations: {
          user: true,
        },
        where: { user: { id: user.id }, forAdoption },
      });
    } else {
      animals = await AppDataSource.getRepository(Animal).find({
        relations: {
          user: true,
        },
        where: { user: { id: user.id } },
      });
    }

    return res.status(200).json(animals);
  } catch {
    console.log("error getting animals");
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
  const user = await AppDataSource.getRepository(User).findOne({
    where: { email },
  });

  const { animalId } = req.body;

  try {
    await AppDataSource.getRepository(Animal).delete({
      id: animalId,
      user: { id: user.id },
    });

    res.status(204).send();
  } catch (err) {
    console.error("Error while trying to delete the animal!!");
    return res.status(500).json(err);
  }
};

export const getAdoptionOrFindMateAnimals = async (
  req: Request,
  res: Response
) => {
  const {
    wantDog,
    wantCat,
    wantBird,
    wantFish,
    wantRodent,
    pageNumber,
    utilityType,
  } = req.query;
  const dog = wantDog === "true";
  const cat = wantCat === "true";
  const bird = wantBird === "true";
  const fish = wantFish === "true";
  const rodent = wantRodent === "true";

  let forAdoption: boolean | undefined;

  const token = req.cookies.token;

  let userId;
  if (!token) {
    userId = "";
  } else {
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });
    userId = user.id;
  }

  if (utilityType === "adoption") {
    forAdoption = true;
  } else if (utilityType === "findMate") {
    forAdoption = false;
  }

  try {
    const queryBuilder = await AppDataSource.getRepository(Animal)
      .createQueryBuilder("animal")
      .leftJoinAndSelect("animal.user", "user")
      .select([
        "animal",
        "user.email",
        "user.firstName",
        "user.lastName",
        "user.phoneNumber",
        "user.country",
        "user.city",
      ]);

    queryBuilder.where(
      dog || cat || bird || fish || rodent
        ? "animal.animalType IN (:...animalTypes)"
        : "1=1",
      {
        animalTypes: [
          dog && "dog",
          cat && "cat",
          bird && "bird",
          fish && "fish",
          rodent && "rodent",
        ].filter(Boolean),
      }
    );

    if (utilityType && (forAdoption === true || forAdoption === false)) {
      queryBuilder.andWhere("animal.forAdoption = :forAdoption", {
        forAdoption,
      });
    }

    if (userId.length > 0) {
      queryBuilder.andWhere("animal.userId != :userId", { userId: userId });
    }

    let page: number = pageNumber;
    if (pageNumber) {
      if (pageNumber == 0) {
        page = 1;
      }
    } else {
      page = 1;
    }

    const animals = await queryBuilder
      .skip((page - 1) * 9)
      .take(9)
      .getMany();

    res.status(200).json(animals);
  } catch (err) {
    console.error("Error while trying to get the adoption animals!!");
    return res.status(500).json(err);
  }
};

export const getAdoptionOrFindMateAnimalsCount = async (
  req: Request,
  res: Response
) => {
  const { wantDog, wantCat, wantBird, wantFish, wantRodent, utilityType } =
    req.query;

  let forAdoption: boolean | undefined;
  const dog = wantDog === "true";
  const cat = wantCat === "true";
  const bird = wantBird === "true";
  const fish = wantFish === "true";
  const rodent = wantRodent === "true";

  if (utilityType === "adoption") {
    forAdoption = true;
  } else if (utilityType === "findMate") {
    forAdoption = false;
  }

  try {
    const queryBuilder = await AppDataSource.getRepository(
      Animal
    ).createQueryBuilder("animal");

    queryBuilder.where(
      dog || cat || bird || fish || rodent
        ? "animal.animalType IN (:...animalTypes)"
        : "1=1",
      {
        animalTypes: [
          dog && "dog",
          cat && "cat",
          bird && "bird",
          fish && "fish",
          rodent && "rodent",
        ].filter(Boolean),
      }
    );

    if (utilityType && (forAdoption === true || forAdoption === false)) {
      queryBuilder.andWhere("animal.forAdoption = :forAdoption", {
        forAdoption,
      });
    }

    const animals = await queryBuilder.getMany();

    res.status(200).json(animals.length);
  } catch (err) {
    console.error("Error while trying to get the adoption animals!!");
    return res.status(500).json(err);
  }
};

export const generatePotentialMathes = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  const animalId = req.query.animalId;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    const animal = await AppDataSource.getRepository(Animal).findOne({
      where: { id: animalId },
    });

    const possibleMatches = await await AppDataSource.getRepository(Animal)
      .createQueryBuilder("animal")
      .leftJoin("animal.user", "user")
      .select(["animal", "user"])
      .where("animal.animalType = :animalType", {
        animalType: animal.animalType,
      })
      .andWhere("animal.breed = :breed", { breed: animal.breed })
      .andWhere("animal.forAdoption = :forAdoption", { forAdoption: false })
      .andWhere("animal.sex != :sex", { sex: animal.sex })
      .andWhere("animal.id != :id", { id: animal.id })
      .andWhere("user.id != :userId", { userId: user.id })
      .getMany();

    res.status(200).json(possibleMatches);
  } catch (err) {
    console.error("Error while trying to get the adoption animals!!");
    return res.status(500).json(err);
  }
};

module.exports = {
  createAnimal,
  getAnimalsByUser,
  deleteAnimal,
  getAdoptionOrFindMateAnimals,
  getAdoptionOrFindMateAnimalsCount,
  generatePotentialMathes,
};

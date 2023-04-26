import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "raulpopovici",
  password: "123456789",
  database: "animalwebapp",
  entities: ["src/entities/**/*.ts"],
  logging: true,
  synchronize: true,
});

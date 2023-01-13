import "reflect-metadata"
import { DataSource } from "typeorm"
import { customers } from "./entity/customers"

export const AppDataSource = new DataSource({ // config settings to connect into DB
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "nylah0424",
    database: "classicmodels",
    synchronize: false,
    logging: true,
    entities: [customers],
    migrations: [],
    subscribers: [],
})

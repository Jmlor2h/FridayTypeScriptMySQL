import { Entity, Column } from "typeorm"
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";


@Entity() // entities are required in order to access data from database, it is just corresponding identifiers to find data within MySQL.
export class customers { // this entity will only work for customers table within DB, id have to create more entities to work with more tables.

    @PrimaryGeneratedColumn()
    customerNumber: number;

    @Column()
    customerName: string

    @Column()
    contactLastName: string

    @Column()
    contactFirstName: string

    @Column()
    phone: string

    @Column()
    addressLine1: string

    @Column()
    addressLine2: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    postalCode: string

    @Column()
    country: string

    @Column()
    salesRepEmployeeNumber: number

    @Column()
    creditLimit: number



}
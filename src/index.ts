import * as express from 'express';
import { AppDataSource } from "./data-source"
import { customers } from './entity/customers';
import * as path from 'path';
import * as bodyParser from "body-parser";
import "reflect-metadata"
import * as cors from "cors";


AppDataSource.initialize().then(async () => { // performs connection to database.

    // TYPEORM DEFAULT CODE EXAMPLE
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // create a new express app
    const app = express();

    app.use(cors());

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
 
    // parse application/json
    app.use(bodyParser.json())



    // define a route for the root path
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    
    app.get('/update', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'update.html'));
    });

    app.get('/delete', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'delete.html'));
    });

    // define a route to fetch all users
    app.get('/customers', async (req, res) => {
        const data = await AppDataSource.manager.find(customers); // find is a method from TypeORM, it is simply the same as using a "SELECT * FROM customers Query."
        res.send(data);
    });

    app.post('/customers/create', async (req, res) => {
        const newCustomer = new customers(); // creates new object 
        // gets data for the object from the html form.
        newCustomer.customerName = req.body.customerName; 
        newCustomer.contactLastName = req.body.contactLastName;
        newCustomer.contactFirstName = req.body.contactFirstName;
        newCustomer.phone = req.body.phone;
        newCustomer.addressLine1 = req.body.addressLine1;
        newCustomer.city = req.body.city;
        newCustomer.state = req.body.state;
        newCustomer.postalCode = req.body.postalCode;
        newCustomer.country = req.body.country;
        newCustomer.salesRepEmployeeNumber = req.body.salesRepEmployeeNumber;
        newCustomer.creditLimit = req.body.creditLimit;
    
        await AppDataSource.manager.save(newCustomer); // imports data from form into mysql database
        console.log(`New customer created with id: ${newCustomer.customerNumber}`); // logs id number
        res.redirect("/")
    });

    app.post('/customers/update', async (req, res) => {
        const customer = await AppDataSource.manager.findOne(customers, { where: { customerNumber: req.body.customerNumber } }); // finds customer by their id number (customerNumber)
        if (!customer) {
             return res.status(404).send({ message: "Customer not found" });
        }
     
        customer.customerName = req.body.customerName; // data from form which will update the customer by its id number(customerNumber)
        customer.contactLastName = req.body.contactLastName;
        customer.contactFirstName = req.body.contactFirstName;
        customer.phone = req.body.phone;
        customer.addressLine1 = req.body.addressLine1;
        customer.addressLine2 = req.body.addressLine2;
        customer.city = req.body.city;
        customer.state = req.body.state;
        customer.postalCode = req.body.postalCode;
        customer.country = req.body.country;
        customer.salesRepEmployeeNumber = req.body.salesRepEmployeeNumber;
        customer.creditLimit = req.body.creditLimit;
     
        await AppDataSource.manager.save(customer); // saves data to customer where id matches.
        console.log("Customer updated successfully!");
        res.redirect("/update")
     });

     app.post('/customers/delete', async (req, res) => {
        // Find the customer to delete based on the customer number in the request parameters
        const customer = await AppDataSource.manager.findOne(customers, { where: { customerNumber: req.body.customerNumber } }); // finds customer by id/customerNumber
        if (!customer) {
            return res.status(404).send({ message: "Customer not found" });
        }
    
        // Delete the customer from the database
        await AppDataSource.manager.remove(customer); // deletes customer
        console.log('Customer Deleted Successfully');
        res.redirect('/delete');
    });

     

    // i have already created a read and create route, i can create an update and delete as well but you can already see its functional.

    // start the express server
    app.listen(3000, () => {
        console.log('Server started on port 3000!');
    });

}).catch(error => console.log(error))
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo")
const PORT = process.env.PORT || 3001;
const app = express();
require("console.table")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection (
    {
        host: "localhost", 
        user: "root",
        password: "wom3nlov3t3ch",
        database: "employee_db"
    },

    console.log("connected")
)

function start() {
    const logoText = logo({name:"Employee \n !"}).render()
    console.log(logoText)
    inquirer.prompt([
        {
            type: "list",
            name: "startingQuestions",
            message: "Select an Option",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add a Department", "Add a Role", "Add an Employee", "Update a Department", "Update a Role", "Update an Employee", "Update Employee Managers", "View Employees by Manager", "View Employees by Department", "Delete Department", "Delete Role", "Delete Employee", "View the Total Budget of the Department", "Quit"
        }
    ]).then((userResponse)=>{
        console.log("user selected:  " + userResponse.startingQuestions)
        let userChoice = userResponse.startingQuestions;
        switch (userChoice) {
            case "View All Employees":
                viewAllEmployees();
                break; 
            case "View All Departments":
                viewAllDepartments();
            case "View All Roles":
                viewAllRoles();
            case "Add a Department":
                addADepartment();
            case "Add a Role":
                addARole();
            case "Add an Employee":
                addAnEmployee();
            case "Update a Department":
                updateADepartment();
            case "Update a Role":
                updateARole();
            case "Update an Employee":
                updateAnEmployee();
            case "Quit":
                quit();
            default:
                console.log("You Blew It")
                break
        }
    })
}

function viewAllEmployees() {
    db.query("SELECT * FROM employee",  function(err, results) {
    (err)? console.log(err): console.table(results), start()
    })
}

function viewAllDepartments() {
    db.query("SELECT * FROM department",  function(err, results) {
    (err)? console.log(err): console.table(results), start()
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM role",  function(err, results) {
    (err)? console.log(err): console.table(results), start()
    })
}


app.use((req, res) => {
    res.status(404).end()
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})

start()
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
            message: "select and option",
            choices: ["view all employees", "view all departments", "view all roles", "add a department", "add a role", "add an employee", "update a department", "update a role", "update an employee", "quit"]
        }
    ]).then((userResponse)=>{
        console.log("user selected:  " + userResponse.startingQuestions)
        let userChoice = userResponse.startingQuestions;
        switch (userChoice) {
            case "view all employees":
                viewAllEmployees();
                break; 
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

app.use((req, res) => {
    res.status(404).end()
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})

start()
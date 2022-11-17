const express = require("express");
const { default: inquirer } = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'bubblegum',
        database: 'employee_db'
    },
    console.log('Connected to employee_db database')
);

database.connect(function(err){
    if(err) throw err;
    console.log('Connected')
    start();
});

function start(){
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Choose an option below'
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ]).then(function(res) {
        switch(res.start){
            case 'View all departments':
                viewDepartment();
                break;
            case 'View all roles':
                viewRole();
                break;
            case 'View all employees':
                viewEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            default:
                console.log('default')
        }
    });
};

const express = require("express");
const { default: inquirer } = require("inquirer");
const mysql = require("mysql2");
const Connection = require("mysql2/typings/mysql/lib/Connection");

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

database.connect(function (err) {
    if (err) throw err;
    console.log('Connected')
    start();
});

function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose an option below',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
                name: 'options'
            }
        ]).then(function (res) {
            switch (res.start) {
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

function viewDepartment() {
    database.createQuery('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
};

function viewRole() {
    database.createQuery('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
};

function viewEmployee() {
    database.createQuery('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
};

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Department name?',
                name: 'department'
            }
        ]).then(function (answer) {
            connection.query(
                'INSERT INTO department VALUES (DEFAULT, ?)',
                [answer.department],
                function (err) {
                    if (err) throw err;
                    console.log('Department, ' + answer.department + ', added to list.');
                    start();
                }
            )
        });
};

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Role name?',
                name: 'role'
            },
            {
                type: 'number',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                message: 'Salary amount?',
                name: 'salary',
            },
            {
                type: 'number',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                message: 'What department will this role be a part of?',
                name: 'department_id'
            }
        ]).then(function (answer) {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    job_title: answer.role,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function (err) {
                    if (err) throw err;
                    console.log('Role, ' + answer.role + ', added to list.');
                    start();
                }
            )
        });
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Employee first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'Employee last name?',
                    name: 'last_name'
                },
                {
                    type: 'rawlist',
                    choices: function () {
                        let roleArray = [];
                        for (i = 0; i < results.length; i++) {
                            roleArray.push(results[i].job_title)
                        }
                        return roleArray;
                    },
                    message: 'Job title?',
                    name: 'job_title'
                },
                {
                    type: 'number',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                    message: 'Manager ID?',
                    default: '1',
                    name: 'manager_id'
                },
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        job_title: answer.job_title,
                        manager_id: answer.manager_id
                    }
                )
                console.log('Employee added to database.');
                start();
            })
    })
};

function updateEmployee() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'rawlist',
                    choices: function () {
                        let employeeArray = [];
                        for(i = 0; i < results.length; i++){
                            employeeArray.push(results[i].last_name);
                        }
                        return employeeArray;
                    },
                    message: 'Which employee would you like to update?',
                    name: 'employee'
                }
            ]).then(function (answer) {
                const employee = answer.employee;
                connection.query('SELECT * FROM employee', function (err, results) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'rawlist',
                                choices: function () {
                                    let roleArray = [];
                                    for (i = 0; i < results.length; i++) {
                                        roleArray.push(results[i].job_title)
                                    }
                                    return roleArray;
                                },
                                message: 'Select job title.',
                                name: 'role'
                            }
                        ]).then(function (answer) {
                            connection.query('UPDATE employee SET ? WHERE last_name = ?',
                                [
                                    {
                                        job_title: answer.role,
                                    },
                                ],
                            ),
                                console.log('Employee rold updated.');
                            start();
                        });
                })
            })
    })
};
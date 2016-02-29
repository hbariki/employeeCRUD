'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(express.static('./client'));
app.get('/templates/*', function(req, res) {
    res.render('../client/templates/' + req.params[0])
});

app.set('views', './views');
app.set('view engine', 'jade');

var employeeController = require('./controllers/employeeController')();
var homeController = require('./controllers/homeController')();

// REST API routes
// Create Employee
app.post('/api/newEmployee', employeeController.createNewEmployee);

// Get all employees
app.get('/api/getEmployees', employeeController.getEmployees);

// Update employee
app.post('/api/updateEmployee', employeeController.updateEmployee);

// Delete Employee
app.post('/api/deleteEmployee', employeeController.deleteEmployee);

// Application UI route
app.get('*', homeController.index);

app.listen(3000, function() {
    console.log('Employee App is running on port 3000');
});

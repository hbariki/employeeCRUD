'use strict';

module.exports= function() {
    var employeeService = require('./../services/employeeService')();

    return {
        createNewEmployee: createNewEmployee,
        getEmployees: getEmployees,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee
    };

    // create new employee
    function createNewEmployee(req, res) {
        employeeService.createEmployee({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email
        }, function(err, result) {
            if(err) {
                res.json(err)
            } else {
                res.json('success');
            }
        });
    }

    // Get employees
    function getEmployees(req, res) {
        employeeService.getEmployees(function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }

    // update employee
    function updateEmployee(req, res) {
        employeeService.updateEmployee({
           name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            id: req.body.id
        }, function(err, result) {
            if(err) {
                res.json(err);
            } else {
                res.json('update successful!!!')
            }
        });
    }

    // delete employee
    function deleteEmployee(req, res) {
        employeeService.deleteEmployee(req.body.employeeId, function(err, result) {
           if(err) {
               res.json(err);
           } else {
               res.json('delete successful!!!')
           }
        });
    }
};
'use strict';

var postGresClient = require('pg');
var connectionString = 'postgres://postgres:password@127.0.0.1:5432/employeedb';

module.exports = function(){
    return {
      createEmployee: createEmployee,
      getEmployees:getEmployees,
      updateEmployee: updateEmployee,
      deleteEmployee: deleteEmployee
    };

    // Create a new employee
   function createEmployee(employeeDetails, callback){

       postGresClient.connect(connectionString, function(err, client, done){
         if(err) {
             callback('sorry your connection to postGres failed!!')
         }else {
          client.query('Insert INTO employees (name, phone, email, createddate) VALUES ($1,$2,$3,$4)',
                 [employeeDetails.name,
                  employeeDetails.phone,
                  employeeDetails.email,
                  new Date()],function(err,result) {
               if(err){
                   callback('createEmployee operation failed!!');
               }else {
                   done();
                   callback(null, 'insert successful');
               }
              });
         }
       });
       postGresClient.end();
   }

   // Read Employees(get a list of all employees)
   function getEmployees(callback){

      postGresClient.connect(connectionString, function(err, client, done){
        if(err) {
         callback('sorry your connection to postGres failed');
        }else {
            client.query('SELECT * FROM employees order by id',
                   [],function(err,result) {
                 if(err) {
                     callback('getEmployees operation failed!!!');
                 }else{
                     done();
                     callback(null, result.rows);
                 }
                });
        }

      });
      postGresClient.end();
   }

    // Update employee details
    function updateEmployee(employeeDetails, callback){

        postGresClient.connect(connectionString, function(err, client, done ){
            if(err) {
             callback('sorry your connection to postGres failed');
            }else {
                client.query('UPDATE employees SET name=$1, phone =$2, email=$3 where id=$4', [
                    employeeDetails.name,
                    employeeDetails.phone,
                    employeeDetails.email,
                    employeeDetails.id
                ], function(err,result) {
                        if (err) {
                            callback('updateEmployee operation failed!!');
                        } else {
                            done();
                            callback(null, 'update successful');
                        }
                    });
            }
        });
        postGresClient.end();

    }

    // delete an employee
    function deleteEmployee(employeeId, callback) {
        postGresClient.connect(connectionString, function(err, client, done) {
            if(err) {
                callback('sorry your connection to postGres failed');
            } else {
                client.query('DELETE from employees where id = $1',[
                    employeeId
                ],function(err,result) {
                    if(err) {
                        callback('delete operation is failed')
                    } else {
                        done();
                        callback(null, 'delete successful');
                    }
                });
            }
        });

        postGresClient.end();
    }
};
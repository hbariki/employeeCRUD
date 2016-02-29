var employeeApp = angular.module('employeeApp', ['ngResource', 'ngRoute']);

employeeApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
        .when('/', { templateUrl: '/templates/home-page', controller: 'employeeController'})
        .when('/newemployee', { templateUrl: '/templates/new-employee', controller: 'newEmployeeController'});
});
employeeApp.controller('employeeController', function($scope, $http) {
    $http.get('api/getemployees').success(function(response) {
        $scope.employees = response;
    });

    $scope.initUpdateModal = function(employeeObj) {
        $scope.name = employeeObj.name;
        $scope.email = employeeObj.email;
        $scope.phone = employeeObj.phone;
        $scope.id = employeeObj.id;
    };

    $scope.updateEmployee = function(isFormInvalid) {
        if(isFormInvalid) {
            alert('form is invalid');
        } else {
            $http.post('api/updateEmployee', {
                name: $scope.name,
                email: $scope.email,
                phone: $scope.phone,
                id: $scope.id
            }).success(function(response) {
                location.href = '/';
            });
        }
    };

    $scope.deleteEmployee = function(employeeId) {
        $http.post('api/deleteEmployee', { employeeId: employeeId }).success(function(response) {
            location.href = '/';
        });
    };

    // This is a test change
    console.log('jhsdgf dsgfjjdsfgjdjsf');

});
employeeApp.controller('newEmployeeController', function($scope, $http) {

    $scope.addNewEmployee = function(isFormInValid) {
        if(isFormInValid) {
            alert('form invalid');
        } else {
            $http.post('api/newEmployee', {
                name: $scope.name,
                email: $scope.email,
                phone: $scope.phone
            }).success(function(response) {
                location.href = '/';
            }).error(function(err){
                alert(err);
            });
        }
    };
});
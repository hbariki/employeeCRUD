var employeeApp = angular.module('employeeApp', ['ngResource', 'ngRoute']);

employeeApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
        .when('/', { templateUrl: '/templates/home-page', controller: 'employeeController'})
        .when('/newemployee', { templateUrl: '/templates/new-employee', controller: 'newEmployeeController'});
});
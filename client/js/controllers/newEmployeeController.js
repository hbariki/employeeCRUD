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
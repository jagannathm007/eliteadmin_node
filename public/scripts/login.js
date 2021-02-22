var EliteAdmin = angular.module("MyApp", []);
EliteAdmin.controller("LoginController", function ($scope, $http) {

    $scope.login = function () {
        var jsonData = {
            username: $scope.username,
            password: $scope.password
        };

        $http({
            url: window.location.origin + "/webv1/login",
            method: "POST",
            cache: false,
            data: jsonData,
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.Data.length == 1) {
                    sessionStorage.setItem("sessId", response.data.Data[0].userData._id);
                    sessionStorage.setItem("sKey", response.data.Data[0].accessToken);
                    sessionStorage.setItem("adminName", response.data.Data[0].userData.name);
                    window.location.href = "dashboard";
                } else {
                    $scope.clearFields();
                }
            },
            function (error) {
                console.log("SomeThing Went Wrong!");
                console.log(error);
            }
        );
    }

    $scope.clearFields = function () {
        $scope.username = "";
        $scope.password = "";
    }

});
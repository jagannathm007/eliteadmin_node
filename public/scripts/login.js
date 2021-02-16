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
            data: data,
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.Data.length == 1) {
                    sessionStorage.setItem("sKey", response.data.Data[0].accessToken);
                    sessionStorage.setItem("adminName", response.data.Data[0].name);
                    window.location.href = "dashboard";
                } else {
                    $scope.clearFields();
                }
            },
            function (error) {
                $scope.errstyle = { color: "red" };
                $scope.errmsg = "Interval Server Error!";
                $scope.loader = false;
                $scope.errscr = true;
                $scope.btndis = false;
            }
        );
    }

    $scope.clearFields = function () {
        $scope.username = "";
        $scope.password = "";
    }

});
EliteAdmin.controller("ServingAreaController", function ($scope, $http) {
  $scope.areaList = [];
  $scope.selectedId = "0";

  $scope.clearAll = function () {
    $scope.selectedId = "0";
    $scope.title = "";
  };

  $scope.getAreas = function () {
    $scope.areaList = [];
    $http({
      url: apiUrl + "getServingArea",
      method: "POST",
      cache: false,
      data: {},
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + sessionStorage.getItem("sKey"),
      },
    }).then(
      function (response) {
        if (response.data.IsSuccess == true && response.data.Data.length > 0) {
          $scope.areaList = response.data.Data;
        }
        console.log("Total Areas: " + $scope.areaList.length);
      },
      function (error) {
        if (error.status == 401) {
          window.location.href = autoLogoutRoute;
        } else {
          console.error("Something Went Wrong! try again");
        }
      }
    );
  };
  $scope.getAreas();

  $scope.onEdit = function (area) {
    $scope.selectedId = area._id;
    $scope.title = area.areaName;
  }

  $scope.addEdit = function () {
    var prepareJson = {
      id: $scope.selectedId,
      areaName: $scope.title
    }
    $http({
      url: apiUrl + "addEditServingArea",
      method: "POST",
      cache: false,
      data: prepareJson,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + sessionStorage.getItem("sKey"),
      },
    }).then(
      function (response) {
        if (response.data.IsSuccess == true && response.data.Data == 1) {
          $scope.clearAll();
          $scope.getAreas();
          alert("Area Saved!");
        }
        console.log("Total Areas After Save: " + $scope.areaList.length);
      },
      function (error) {
        console.log(error);
        if (error.status == 401) {
          window.location.href = autoLogoutRoute;
        } else {
          console.log("Something Went Wrong! try again");
        }
      }
    );
  }

  $scope.onDelete = function (area) {
    let prepareJson = { id: area._id };
    var confm = confirm("Do you really want to delete " + area.areaName + "?");
    if (confm) {
      $http({
        url: apiUrl + "deleteServingArea",
        method: "POST",
        cache: false,
        data: prepareJson,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Authorization": "Bearer " + sessionStorage.getItem("sKey"),
        },
      }).then(
        function (response) {
          if (response.data.IsSuccess == true && response.data.Data == 1) {
            $scope.clearAll();
            $scope.getAreas();
            alert("Area Deleted");
          }
          console.log("Total Areas After Deleted: " + $scope.areaList.length);
        },
        function (error) {
          console.log(error);
          if (error.status == 401) {
            window.location.href = autoLogoutRoute;
          } else {
            console.log("Something Went Wrong! try again");
          }
        }
      );
    }

  }
});
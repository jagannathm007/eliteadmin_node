EliteAdmin.controller("CustomerChatController", function ($scope, $http, SocketService) {
    $scope.customerList = [];
    $scope.currentChat = [];
    $scope.sesssId = sessionStorage.getItem("sessId");
    $scope.currentCustomerId = "";

    $scope.messageBox = "";

    $scope.getChatByCustomer = function (customerId) {
        $scope.currentCustomerId = customerId;
        $scope.currentChat = [];
        SocketService.emit("getAdminChats", { customerId: customerId,adminId:$scope.sesssId});
    }

    $scope.newMessage = function () {
        if ($scope.messageBox != "") {
            var chatData = {
                from: $scope.sesssId,
                to: $scope.currentCustomerId,
                message: $scope.messageBox,
            }
            SocketService.emit("addAdminChat", chatData);
            $scope.messageBox ="";
        }
        else {
            console.log("Please Enter Some Message!");
        }
    }

    SocketService.on('getAdminChatList', function (chatList) {
        $scope.currentChat = chatList;
        console.log($scope.currentChat);
        
    });

    SocketService.on('newAdminChat', function (chat) {
        $scope.currentChat.push(chat);
    });

    $scope.getCustomer = function () {
        $http({
            url: apiUrl + "getCustomers",
            method: "POST",
            cache: false,
            data: {},
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + sessionStorage.getItem("sKey"),
            },
        }).then(
            function (response) {
                console.log("Get Customers");
                if (response.data.IsSuccess == true && response.data.Data.length > 0) {
                    $scope.customerList = response.data.Data;
                    $scope.getChatByCustomer(response.data.Data[0]._id);
                }
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
    $scope.getCustomer();
});
var EliteAdmin = angular.module("MyApp", ['btford.socket-io']);

//Enabling For Loop in NG-Repeat
EliteAdmin.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++) {
            input.push(i);
        }
        return input;
    };
});

//Enabling Socket Services
EliteAdmin.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect(window.location.origin)
    });
}]);

//consts
var apiUrl = window.location.origin + "/webv1/";
var baseUrl = "";
var autoLogoutRoute = "/authentication?error=ReloginFirst";

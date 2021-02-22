window.onload = function () {
    var hiChat = new HiChat();
    hiChat.init();
};

var HiChat = function () {
    this.socket = null;
}

HiChat.prototype = {
    init: function () {
        var that = this;
        // Connect With Socket Of Server
        var sessionId = sessionStorage.getItem('sessId');
        this.socket = io.connect();
        this.socket.on("connect", function () {
            console.log("Connected With Server.");
        });

        //send location to server
        var data = {
            sessionId: sessionId
        };
        this.socket.emit("locationSocket", data);
    }
}
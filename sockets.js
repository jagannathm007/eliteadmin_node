//Sockets
const io = require("socket.io")();
const socketapi = { io: io };
var aes256 = require('aes256');

//Schemas
var users = require("./models/users");
var chats = require("./models/chats");
var admins = require("./models/admin_login");

io.on("connection", function (client) {
    console.log("New user handshake successfull!");

    //Customer To Admin
    //Chatting events on sockets client to server
    client.on('getCustomerChats', async function (data) {
        console.log("CustomerId: " + data.customerId);

        //If user found then send all chats
        var findUser = await users.find({ _id: data.customerId });
        if (findUser.length == 1) {
            var chatList = await chats.find({ to: findUser[0]._id });
            //Sending chats to client
            client.emit("getCustomerChatList", chatList);
        }
    });

    //Send message from client to server
    client.on('addCustomerChat', async function (data) {
        console.log("Adding New Chat");
        var newChat = new chats(data);
        await newChat.save();
        client.emit("newCustomerChat", data);
    });


    //Admin To Customer
    //Chatting events on sockets server to client
    client.on('getAdminChats', async function (data) {
        console.log("CustomerId: " + data.customerId);
        console.log("AdminId:" + data.adminId);

        //If user found then send all chats
        var findUser = await users.find({ _id: data.customerId });
        if (findUser.length == 1) {
            var chatList = await chats.find({ from: data.adminId, to: findUser[0]._id })
                .populate({ path: 'from', model: admins })
                .populate({ path: 'to', model: users });

            var updatedChats = [];
            for (var i = 0; i < chatList.length; i++) {
                if (data.adminId == chatList[i].from._id) {
                    chatList[i].message = aes256.decrypt(data.adminId, chatList[i].message);
                } else {
                    chatList[i].message = aes256.decrypt(data.customerId, chatList[i].message);
                }
                updatedChats.push(chatList[i]);
            }

            //Sending chats to client
            client.emit("getAdminChatList", chatList);
        }
    });

    //Send message from server to client
    client.on('addAdminChat', async function (data) {
        //Encrypt Message Before Saving To Server

        var encryptedPlainText = aes256.encrypt(data.from, data.message);
        data.message = encryptedPlainText;

        //Saving To Database
        var newChat = new chats(data);
        await newChat.save();

        //Get Last Chat Data With Populating
        var chatList = await chats.find({ from: data.from, to: data.to }).sort({ _id: -1 }).limit(1)
            .populate({ path: 'from', model: admins })
            .populate({ path: 'to', model: users });

        //Before Emiting Decrypt The Message
        if (chatList.length > 0) {
            var decryptedPlainText = aes256.decrypt(data.from, chatList[0].message);
            chatList[0].message = decryptedPlainText;
        }

        //Emit Data To Client From Server.
        client.emit("newAdminChat", chatList[0]);
    });

});
module.exports = socketapi;
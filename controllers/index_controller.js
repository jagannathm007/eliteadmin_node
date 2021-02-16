var config = require("../config");
exports.loginRequest = function (req, res, next) {
    try {
        const { username, password } = req.body;
        res.json({
            Message: "User Found!",
            Data: {
                username: username,
                password: password
            },
            IsSuccess: true
        });
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
}
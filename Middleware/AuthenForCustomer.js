const jwt = require("jsonwebtoken");

const AuthenForCustomer = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        token = token.replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        // Check if the role is "manager"
        if (decoded && decoded.Role === "Customer") {
            req.user = decoded;
            console.log(decoded)
            return next();
        } else {
            return res.status(403).send("Access denied. User is not a Customer.");
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = AuthenForCustomer;

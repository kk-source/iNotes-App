const jwt = require("jsonwebtoken");
const JWT_SECRET = "Kartikisagoodboy";

module.exports = async function fetchUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        // console.log(error.message);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
}

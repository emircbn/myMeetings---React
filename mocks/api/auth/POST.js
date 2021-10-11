const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const token = jwt.sign(req.body, 'my-meetings-secret-key');
  return res.json({
    token
  });
}

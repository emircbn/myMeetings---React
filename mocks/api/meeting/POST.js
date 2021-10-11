const { generateId } = require("../utils");

module.exports = (req, res) => {
  const id = generateId();
  return res.json({
    id,
    ...req.body
  });
}

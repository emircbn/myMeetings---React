import { generateId } from "../utils";

module.exports = (req, res) => {
  const id = generateId();
  return res.json({
    id,
    username: "root"
  });
}

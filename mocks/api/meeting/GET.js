const meeting1 = require("./1/GET.json")
const meeting2 = require("./2/GET.json")
const meeting3 = require("./3/GET.json")
const meeting4 = require("./4/GET.json")
const meeting5 = require("./5/GET.json")
const meeting6 = require("./6/GET.json")

module.exports = (req, res) => {
  return res.json([
    meeting1,
    meeting2,
    meeting3,
    meeting4,
    meeting5,
    meeting6
  ]);
}

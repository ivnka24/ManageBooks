const routes = require("express").Router();
const bookRoutes = require("./book.js");
const memberRoutes = require("./member.js");
const memberBookRoutes = require("./bookmember.js");
routes.get("/", (req, res) => {
  res.send("Test Running");
});

routes.use("/books", bookRoutes);
routes.use("/members", memberRoutes);
routes.use("/bookmembers", memberBookRoutes);
module.exports = routes;

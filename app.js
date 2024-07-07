const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/index");
const setupSwagger = require("./swagger");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
setupSwagger(app);

app.listen(port, () => {
  console.log(`App running on port 3000`);
});

module.exports = app;

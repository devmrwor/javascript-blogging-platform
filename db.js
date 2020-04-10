const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");
const connectionString = process.env.CONNECTIONSTRING;

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    module.exports = client.db();
    const app = require("./app");
    app.listen(process.env.PORT);
  }
);

const express = require("express");
const app = express();
const accounts = require("./routes/account");

require("dotenv").config();
app.use(express.json());


app.use("/api/v1/accounts", accounts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

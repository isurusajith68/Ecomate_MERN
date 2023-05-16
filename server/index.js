const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Running");
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    writeConcern: { w: "majority", j: true, wtimeout: 1000 },
  })
  .then(() => console.log("Database Successfully Connected"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;

app.use("/user", require("./routes/User"));
app.use("/resource", require("./routes/Resource"));
app.use("/audit", require("./routes/EnergyAudit"));

app.listen(port, () => {
  console.log(`Server Running on Port - ${port}`);
});

module.exports = app;

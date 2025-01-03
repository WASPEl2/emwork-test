const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("app:server");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

const routes = require("./routes");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

morgan.token("dateLocal", (req, res) => new Date().toISOString());
const loggerFormat = `[:dateLocal] addr=:remote-addr user=:remote-user :method :url :status :res[content-length] - :response-time ms`;
app.use(
  morgan(loggerFormat, {
    skip: (req, res) => {
      if (req.originalUrl.indexOf("/library") === 0) return true;
      if (req.originalUrl.indexOf("/public") === 0) return true;
      return res.statusCode < 400;
    },
  })
);
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(process.env.PORT || 3001, () =>
  debug("Server running on port 3001")
);

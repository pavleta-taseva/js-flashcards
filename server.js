const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

const cors = require("cors");
const { NODE_ENV, APP_ROUTE_DEV, APP_ROUTE_PROD } = process.env;
const isProduction = () => NODE_ENV === "production";

const originSites = [isProduction() ? `${APP_ROUTE_PROD}` : `${APP_ROUTE_DEV}`];
app.use(cors({ credentials: true, origin: originSites }));

app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port);

// "start": "react-scripts start",
// "start": "node server.js",

/* eslint-disable quotes */
/* eslint-disable semi */
const app = require("./app.js");
const express = require("express");
const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.listen(process.env.PORT || 3000, () => {
  console.log("started express server at port 3000");
});

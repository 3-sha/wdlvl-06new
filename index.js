/* eslint-disable quotes */
/* eslint-disable semi */
const app = require("./app.js");
app.listen(process.env.PORT || 3000, () => {
  console.log("started express server at port 3000");
});

const app = require("./app.js");

require("dotenv").config();
const PORT = process.env.PORT;

// app.get("api", (req, res) => {
//   res.json({message:"Hello World"});
// })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
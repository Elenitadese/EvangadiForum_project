require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT; // You can change the port number if needed

app.use(cors); // Enable CORS for all origins
app.use(express.json({ extended: true })); // Parse JSON bodies

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

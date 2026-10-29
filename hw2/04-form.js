const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// http://localhost:5001/form should return a form with input elements for username, email, and submit button[cite: 6]
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// http://localhost:5001/submit should return all the data the user entered[cite: 6]
app.post("/submit", (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server running. Visit http://localhost:${port}/form`);
});

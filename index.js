// Install EJS, Express, and MongoDB in Terminal 

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(express.json());

const countrySchema = new mongoose.Schema({
  country: { type: String },
  flagURL: { type: String },
  population: { type: Number },
  officialLanguage: { type: String },
  hasNuclearWeapons: { type: Boolean },
});

const Country = mongoose.model("Country", countrySchema, "Countries");

// Create a POST route for "/add/country" that adds a country using the request body (3 points)
// Use postman to add at least THREE different countries

app.post("/add/country", async (req, res) => {
  const newCountry = new Country(req.body);
  await newCountry.save();
  res.json(newCountry);
});

// Create a GET route for "/" that renders countries.ejs with every country from the Countries collection (1 point)

app.get("/", async (req, res) => {
  const countries = await Country.find({});
  res.render("countries.ejs", { countries });
});

// Go to countries.ejs and follow the tasks there (2 points)

// Create a dynamic PATCH route handler for "/update/{name}" that modifies the population of the country specified in the path (3 points)
// Test this route on post man

app.patch("/update/:name", async (req, res) => {
  const updated = await Country.findOneAndUpdate(
    { country: req.params.name },
    { population: req.body.population },
    { new: true }
  );
  res.json(updated);
});

// Create a DELETE route handler for "/delete/country" that deletes a country of your choice (3 points)
// Test this route on post man

app.delete("/delete/country", async (req, res) => {
  const delcountry = await Country.findOneAndDelete({ country: req.body.country });
  res.json(delcountry);
});

// Add your SRV string, make sure that the database is called countries
async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.6037ml8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  app.listen(3000, () => {
    console.log("mari's code is online...");
  });
}

startServer();


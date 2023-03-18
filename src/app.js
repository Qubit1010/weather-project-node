const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocodeFetch = require("./utills/geocode");

const port = process.env.Port || 3000

const app = express();

// Define paths for express  config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewpath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// routes
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "G Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "help",
    name: "G Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  const weatherInfo = async () => {
    
      const { forecast, location } = await geocodeFetch(req.query.address);

      res.send({
        forecast: forecast,
        location: location,
        address: req.query.address,
      });
  };

  weatherInfo();
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide  a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "G mead",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "G mead",
    errorMessage: "Page Not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});

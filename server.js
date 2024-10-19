const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shorturl");
const methodOverride = require("method-override");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost/urlShrinker");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Allows overriding methods using ?_method=DELETE

// Route to display all short URLs
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

// Route to create a new short URL
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

// Route to delete a short URL by ID
app.delete("/shortUrls/:id", async (req, res) => {
  await ShortUrl.findByIdAndDelete(req.params.id); // Delete the document from the database
  res.redirect("/"); // Redirect back to the homepage after deletion
});

// Route to redirect to the full URL
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

// Start the server
app.listen(process.env.PORT || 8080);

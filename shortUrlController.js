import { ShortUrl } from "../models/shortUrl.js"

const getAllShortUrl = async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render("index", { shortUrls: shortUrls })
}

const createShortUrl = async (req, res) => {
  try {
    await ShortUrl.create({
      full: req.body.fullUrl
    })
    res.redirect("/")
  } catch (error) {
    console.log(error)
    res.status(500).send("An error occurred while creating the url")
  }
}

const redirectShortUrl = async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.id })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
  } catch (error) {
    console.log(error)
    res.status(500).send("An error occurred while redirecting the url")
  }
}

const deleteShortUrl = async (req, res) => {
  try {
    console.log(req.params.id)
    const result = await ShortUrl.findByIdAndDelete(req.params.id)
    res.redirect("/")
  } catch (error) {
    console.log(error)
    res.status(500).send("An error occurred while deleting the URL")
  }
}

export { getAllShortUrl, createShortUrl, redirectShortUrl, deleteShortUrl }
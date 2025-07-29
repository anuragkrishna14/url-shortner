const URL = require("../models/urlModel");
const generateShortId = require("../utils/generateShortId");
const isValidUrl = require("../utils/isValidUrl");

const handleGenerateNewShortURL = async (req, res) => {
  const {url, customCode} = req.body;

  if(!url) return res.status(400).json({error: "URL is required"});
  if(!isValidUrl(url)) return res.status(400).json({error: "Invalid URL format"});

  try{
    let shortCode;
    if(customCode){
      const existingCustomCode = await URL.findOne({shortCode: customCode});
      if(existingCustomCode) return res.status(409).json({error: "Custom code already in use"});
      shortCode = customCode;
    }
    else{
      while(true){
        shortCode = generateShortId(8);
        const existingShortCode = await URL.findOne({shortCode: shortCode});
        if(!existingShortCode) break;
      }
    }

    const newUrl = await URL.create({
      originalUrl: url,
      shortCode: shortCode,
    });
    const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}` || `http://localhost:3000`;
    res.status(201).json({
      originalUrl: url,
      shortUrl: `${process.env.BASE_URL}:${process.env.PORT}/r/${shortCode}`,
    });
  }
  catch(err){
    res.status(500).json({error: "Internal server error"});
  }  
}


const redirectUrl = async (req, res) => {
  const {shortCode} = req.params;

  try{
    const urlEntry = await URL.findOne({shortCode});

    if(!urlEntry) return res.status(404).json({error: "URL does not exists"});

    urlEntry.clicks += 1;
    await urlEntry.save();

    return res.redirect(302, urlEntry.originalUrl);
  }
  catch(err){
    res.status(500).json({error: "Internal server error"});
  }
}


const getStats = async (req, res) => {
  const {shortCode} = req.params;

  try{
    const urlEntry = await URL.findOne({shortCode});
    if(!urlEntry) return res.status(404).json({error: "URL does not exists"});



    return res.status(200).json({
      originalUrl: urlEntry.originalUrl,
      shortUrl: `${req.protocol}://${req.get("host")}/r/${urlEntry.shortCode}`,
      clicks: urlEntry.clicks,
    })
  }
  catch(err){
    res.status(500).json({error: "Internal server error"});
  }
}

module.exports = {handleGenerateNewShortURL, redirectUrl, getStats};
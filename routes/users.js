var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Requiring scraping tools
var cheerio = require("cheerio");
var axios = require("axios");
var Filter = require("bad-words");
var customFilter = new Filter({placeHolder: "*"});

// Making a request for The New Yorker's Boriwitz Report satire page. The page's HTML is passed as the callback's third argument
axios.get("https://www.newyorker.com/humor/borowitz-report").then(function(res) {

//  Load the HTML into cheerio and save it to a variable
//  $ becomes shorthand for cheerio's selector commands, much like jQuery
  var $ = cheerio.load(res.data);


//  an empty array to save the data that we'll scrape.
  var results = [];

//  With cheerio, find each li tag with the class they tend to have
  $("div.River__riverItemContent___2hXMG").each(function (i, element) {

    //Declare a local variable called title and put the text from the h4 title into it.
    var title = $(element).find("h4").text();

    //Declare a local variable called title and put the text from the h4 title into it.
    var link = $(element).children().find("a").attr("href");

    //Declare a local variable called summary and put the text from the h5 summary of the sibling of the original link into it.
    var summary = $(element).find("h5").text();

    //Push variables into array in form of string
    results.push({
      title: title,
      link: link,
      summary: summary
    })
  })

});


//TODO Add CRUD operations for connecting to database

module.exports = router;

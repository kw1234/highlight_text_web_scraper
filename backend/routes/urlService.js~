const siteUrl = "https://yahoo.com";
const axios = require("axios");
const cheerio = require("cheerio");
var blockspring = require("blockspring");

var topWordsStore = {};
var textStore = "";

exports.search = async function(req, res) {
    var body = req.body;

    // using blockspring api to scrape the text from the url.
    // preferred this to what I had done previously, which was just get the html of the page. I tried sorting through that html and finding the meaningful text, but found this and it was faster.
    const result = await blockspring.runParsed("get-text-from-url", { "url": body['url'] }, { api_key: "br_130906_e2b2210aee5959f094ebb31c4d1bb98267277765"}, function(response) {
	    var text = response.params;
	    if (text == null || Object.keys(text).length == 0) {
		res.send({"text":"Error: We were not able to get the text from this website"});
	    } else {
		var topWords = getTopTenWords(text['text']);
		res.send(topWords);
	    }
	});
    return result;
};

exports.highlight = async function(req, res) {
    var word = req.params.word;
    var body = req.body;
    var highlightedText = highlightWord(body['word']);
    res.send(highlightedText);
}


function getTopTenWords(text) {

    // split all the words in text by space
    var wordsArray = text.split(/\s+/);
    var splitWords = [];
    wordsArray.forEach(function (word1) {
	    // if word is all upper case, it is an acronym so push it to the words array
	    if (isUpperCase(word1)) {
		splitWords.push(word1);
	    } else {
		// split the words by camel case and try to preserve acronyms as well
		var splitUpper = word1.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
		splitUpper.forEach(function (word2) {
			splitWords.push(word2);
		    });
	    }
	});

    var newText = "";

    // create a new text blob out of the parsed words from the original text
    splitWords.forEach(function(word) {
	    newText += word+" ";
	});

    var wordsMap = {};

    // get a count of each of the words in the text
    splitWords.forEach(function (key) {
	    if (wordsMap.hasOwnProperty(key)) {
		wordsMap[key]++;
	    } else {
		wordsMap[key] = 1;
	    }
	});

    // Create items array
    var items = Object.keys(wordsMap).map(function(key) {
	    return [key, wordsMap[key]];
	});

    // Sort the array based on the second element
    items.sort(function(first, second) {
	    return second[1] - first[1];
	});

    topWordsStore = items.slice(0, 10);
    textStore = newText;
    // Create a new dict with 1) array with only the first 10 items 2) the new text to be displayed
    return {"topWords":items.slice(0,10), "text":newText};

}

function highlightWord(word) {
    var wordsArray = textStore.split(/\s+/);
    var newText = "";
    wordsArray.forEach(function (word1) {
            if (word1 == word) {
		newText += "<mark>"+word1+"</mark> ";
	    } else {
		newText += word1+" ";
	    }
	});
    return {"topWords": topWordsStore,"text": newText};
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}
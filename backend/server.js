var express = require('express');
var app = express();
var urlService = require('./routes/urlService.js');
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res, next) {
	createListing(req.ip);
	next();
    });

app.use('/', router);
app.use(express.static('frontend'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });




// the below is the mongo cloud connection for keeping track of website hits
var mongoUri = "mongodb+srv://karanwarrier:kaw009020@cluster0.mjivw.mongodb.net/WebsiteHits?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(mongoUri, { useUnifiedTopology: true }, { useNewUrlParser: true });
client.connect(err => {
	console.log("connected to mongodb");
	});

async function createListing(ip){
    console.log(ip);
    const result = await client.db("WebsiteHits").collection("hits").insertOne({"ip":ip});
    console.log(`New listing created with the following id: ${result.insertedId}`);
}


// establishing routes below
var api = express.Router();

app.get('/', function(req, res) {
	res.redirect("/");
    });

api.post('/search', urlService.search);

api.post('/highlight/:word', urlService.highlight);

app.use('/api', api);

app.listen(8080);
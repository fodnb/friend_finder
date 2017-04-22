//npm init
//npm install body parser & express

var express = require("express");
var app = express();
var bodyParser = require("body-Parser");
var path = require("path");

var PORT = process.env.PORT || 3000;

// app.get("/", function(request, response){
// 	response.send("hello world");

// })


app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

console.log(__dirname);

app.use("/cssFiles", express.static(__dirname + "/public/assets"));


require("./routing/api-routes.js")(app);

require("./routing/html-routes.js")(app);



app.listen(PORT, function(){
console.log("app listening on PORT:" + PORT);

});



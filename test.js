var express = require('express');
var app = express();
var fs = require("fs");
var mv = require('mv');
var fileUpload = require('express-fileupload');
var Tesseract = require('tesseract.js');
app.use(fileUpload());
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){ // getting the url that ends with /
	res.sendFile( __dirname + "/" + "index1.html" );   //serve them the html file
})
app.get('/upload-finished', function(req,res){ // getting the url that ends with /
	res.sendFile( __dirname + "/" + "uploadfinished.html" );   
})
app.post('/file-upload',function(req,res){
    if (!req.files) //if no files
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.theFile;
  
  // Use the mv() method to place the file somewhere on your server
  let path =__dirname+'\\public\\images\\' + sampleFile.name;
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.redirect('/upload-finished');
	
  });
});


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
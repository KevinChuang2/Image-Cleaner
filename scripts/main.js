var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var Tesseract = require('tesseract.js');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Kevin/Documents/Web Sites/cleaner/images/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write(newpath);
        res.end();
      });
	  /*
	  fs.readFile(newpath, function(err, data){
		  if(err) throw err;
		  res.writeHead(200, {'Content-Type': 'image/jpeg'});
		  res.end(data); // Send the file data to the browser.
	  });
*/
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
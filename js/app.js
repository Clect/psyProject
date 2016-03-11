var http = require('http');
var fs = require('fs');

http.createServer(function(req, resp) {
  var chunks=[];
  var size=0;
 
  req.on('data', function(data){
    chunks.push(data);
    size+=data.length;
  });
  
  req.on('end', function(){
    var buf = Buffer.concat(chunks, size);
    var str = buf.toString();
    
    //console.log(req.url)
	if(req.url=='/record'){
        console.log(str);
		fs.appendFile("../data.txt",str);
	}
    resp.writeHead(200, {"Access-Control-Allow-Origin": "*"});
    resp.end();
  });
  
}).listen(8088);
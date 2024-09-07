var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
    let filePath = __dirname + req.url;

    if (req.url === '/views/home' || req.url === '/') {
        filePath = __dirname + "/views/home.html";
    } else if (req.url === '/views/achiev') {
        filePath = __dirname + "/views/achiev.html";
    } else if (req.url === '/views/education') {
        filePath = __dirname + "/views/education.html";
    } else if (req.url === '/views/hobbies') {
        filePath = __dirname + "/views/hobbies.html";
    } else if (req.url === '/views/contact') {
        filePath = __dirname + "/views/contact.html";
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    if (req.url.startsWith('/picture/')) {
        filePath = path.join(__dirname, req.url);
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile(__dirname + '/views/404.html', function(err, content) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3000);
console.log('Server is running on localhost:3000');

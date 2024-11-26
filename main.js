var http = require("http");
var fs = require("fs");
var url = require("url");
http
  .createServer((req, res) => {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    switch (filename) {
      case "./":
        renderFile("index.html", res);
        break;
      default:
        renderFile(filename, res);
        break;
    }
  })
  .listen(8080);
function renderFile(filename, res) {
  fs.readFile(filename, (err, data) => {
    if (err) {
      const data = fs.readFileSync("./404.html");
      res.writeHead(404, { "content-type": "text/html" });
      res.write(data);
      return res.end();
    }
    res.writeHead(200, { "content-type": "html" });
    res.write(data);
    return res.end();
  });
}

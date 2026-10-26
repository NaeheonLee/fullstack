const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === "/welcome") {
    // Return a status code 200 with a welcome message in HTML format
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to the Node.js Routing Exercise!</h1>");
    res.end();
  } else if (url === "/redirect") {
    // Redirect the request to '/redirected' using a 302 status code
    res.writeHead(302, { Location: "/redirected" });
    res.end();
  } else if (url === "/redirected") {
    // The redirected page returning a custom message
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>You have been successfully redirected.</h1>");
    res.end();
  } else if (url === "/cache") {
    // Return 'this resource was cached' in HTML and set cache max age to 1 day (86400 seconds)
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "max-age=86400",
    });
    res.write("<h1>this resource was cached</h1>");
    res.end();
  } else if (url === "/cookie") {
    // Return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Set-Cookie": "hello=world",
    });
    res.write("cookies.. yummm");
    res.end();
  } else if (url === "/") {
    // Default root route
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Node Routing Exercise");
    res.end();
  } else {
    // All other routes return status code 404 with '404 - page not found' in HTML format
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 - page not found</h1>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const http = require('http');
const url = require('url');

const port = 7010;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/ticket') {
    import('./flightTicket.mjs')
      .then((module) => {
        const myTicket = new module.default('121', '9102', 'Cairo', 'Alex', '2024-03-31');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(myTicket.getInfo()));
      })
      .catch((err) => {
        console.error('Error importing FlightTicket:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
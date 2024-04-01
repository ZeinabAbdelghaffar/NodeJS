const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/') {
    fs.readFile(path.join(__dirname, 'public', 'main.html'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && url.pathname === '/submit') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { name, mobile, addr, email } = querystring.parse(body);
      const clientData = { name, mobile, addr, email };
      fs.readFile('clients.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }

        let clients = [];
        if (data) {
          clients = JSON.parse(data);
        }

        clients.push(clientData);
        fs.writeFile('clients.json', JSON.stringify(clients, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(302, { 'Location': `/welcome.html?name=${name}&mobile=${mobile}&addr=${addr}&email=${email}` });
            res.end();
          }
        });
      });
    });
  } else if (req.method === 'GET' && url.pathname === '/welcome.html') {
    const { name, mobile, addr, email } = url.searchParams;
    fs.readFile(path.join(__dirname, 'public', 'welcome.html'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        const content = data.replace('{{name}}', name).replace('{{mobile}}', mobile).replace('{{addr}}', addr).replace('{{email}}', email);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.method === 'GET' && url.pathname === '/clients') {
    fs.readFile('clients.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        let clients = [];
        if (data) {
          clients = JSON.parse(data);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(clients, null, 2));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 7000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
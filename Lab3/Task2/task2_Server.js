const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 7002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/submit', (req, res) => {
  const { name, mobile, addr, email } = req.body;
  const clientData = { name, mobile, addr, email };
  fs.readFile('clients.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    let clients = [];
    if (data) {
      clients = JSON.parse(data);
    }

    clients.push(clientData);
    fs.writeFile('clients.json', JSON.stringify(clients, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      res.redirect(`/welcome.html?name=${name}&mobile=${mobile}&addr=${addr}&email=${email}`);
    });
  });
});

app.get('/welcome.html', (req, res) => {
  const { name, mobile, addr, email } = req.query;
  res.sendFile(path.join(__dirname, 'public', 'welcome.html'), {
    name,
    mobile,
    addr,
    email,
  });
});

app.get('/clients', (req, res) => {
  fs.readFile('clients.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    let clients = [];
    if (data) {
      clients = JSON.parse(data);
    }

    res.json(clients);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
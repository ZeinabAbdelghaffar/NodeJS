import express from 'express';
import FlightTicket from './flightTicket.mjs';

const app = express();
const port = 7001;

const myTicket = new FlightTicket('121', '9102', 'Cairo', 'Alex', '2024-03-31');

app.get('/ticket', (req, res) => {
  res.send(myTicket.getInfo());
});

app.put('/ticket', (req, res) => {
  myTicket.updateInfo(req.query.seatNum, req.query.flightNum, req.query.departureAirport, req.query.arrivalAirport, req.query.travellingDate);
  res.send('Ticket information updated.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
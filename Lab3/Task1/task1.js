const FlightTicket = require('./flightTicket');

const myTicket = new FlightTicket('121', '9102', 'Cairo', 'Alex', '2024-03-31');

console.log('----------------------------------------');
console.log('Display Initial Ticket Information:');
console.log('----------------------------------------');
myTicket.displayInfo();

console.log('\n----------------------------------------');
console.log('Get Ticket Information:');
console.log('----------------------------------------');
const ticketInfo = myTicket.getInfo();
console.log('Ticket Information:', ticketInfo);
//console.log('Ticket Information:', JSON.stringify(ticketInfo));


console.log('\n----------------------------------------');
console.log('Updated Ticket Information:');
console.log('----------------------------------------');
myTicket.updateInfo('211', '9017', 'Cairo', 'Alex', '2024-04-01');
myTicket.displayInfo();

console.log('\n----------------------------------------');
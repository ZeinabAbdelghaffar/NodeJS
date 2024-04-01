const EventEmitter = require('./eventModule');

const eventEmitter = new EventEmitter();

eventEmitter.on('introduce', (name, age, education) => {
  console.log(`Hello my Name is: ${name}! I am ${age} years old and currently an ${education}.`);
});

eventEmitter.emit('introduce', 'Zeinab', 22, 'ITI trainee');
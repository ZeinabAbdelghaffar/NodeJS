const fss = require('node:fs/promises');
const http = require('node:http');
const server = http.createServer(async (req, res) => {
    try {
        const { operation, numbers } = parseRequest(req.url);
        const result = calculateOperation(operation, numbers);
        await writeResultToFile(result);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>${result}</h1>`);
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Error: ${error.message}</h1>`);
    }
});
server.listen(3000);
function parseRequest(url) {
    const [, operation, ...numbers] = url.split('/');
    if (!['add', 'subtract', 'multiply', 'divide'].includes(operation) || numbers.length < 2) {
        throw new Error('Invalid operation or insufficient numbers provided');
    }
    if (numbers.length < 2) {
        throw new Error('At least two numbers are required for the binary operation.');
    }
    return { operation, numbers: numbers.map(num => parseInt(num)) };
}
function calculateOperation(operation, numbers) {
    switch (operation) {
        case 'add':
            return numbers.reduce((acc, curr) => acc + curr, 0);
        case 'subtract':
            return numbers.reduce((acc, curr) => acc - curr);
        case 'multiply':
            return numbers.reduce((acc, curr) => acc * curr, 1);
        case 'divide':
            return numbers.reduce((acc, curr) => acc / curr);
    }
}
async function writeResultToFile(result) {
    await fss.writeFile('Result', JSON.stringify(result));
    console.log('Operation result has been written to "Result" file successfully.');
}
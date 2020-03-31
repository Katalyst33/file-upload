const http = require('http');
const app = require('./app');

const Url = 'http://127.0.0.1:';

const port =  5000;


const server = http.createServer(app);

server.listen(port);

console.log(`server started on ${Url}${port}`);

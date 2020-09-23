const fs = require('fs');
const net = require('net');
const server = net.createServer();
const port = 8000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

server.on('connection', (client) => {
  console.log('New client connected!');
  // client.write('Hello there!');
  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    fs.readFile(data, 'utf8', (error, str) => {
      if(!error) client.write(str);
      return process.exit(0);
    })

    console.log('Message from client: ', data)
  });
});
const net = require('net');
const readline = require('readline');
const fs = require('fs');

const conn = net.createConnection({
  host: 'localhost',
  port: 8000
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

conn.setEncoding('utf8');

conn.on('connect', () => {
  console.log('We are connected.');
})
const loc = './dest/test.txt'

conn.on('data', (data) => {
  console.log('Server says: ', data);
  fs.writeFile(loc, data, (err) => {
    if (err) throw err;
    console.log('Saved!');
    console.log(`Downloaded and saved ${Buffer.byteLength(data)} bytes to ${loc}`)
    rl.close();
    process.exit(0);
  });
});

rl.question('Enter file to look for: > ', (chunk) => {
  conn.write(chunk);
  rl.close();
})


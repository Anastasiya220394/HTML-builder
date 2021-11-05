const fs = require('fs');
const path = require('path');

path1 = path.join("02-write-file", "text.txt");

const writeStream = fs.createWriteStream(path1),
stdout = process.stdout,
stdin = process.stdin;

console.log('Hi, type your text');

stdin.on('data', (data) => {
    data.toString().trim() === 'exit'
      ? process.exit()
      : writeStream.write(data); 
    stdout.write(`Continue\n`);
});

process.on('exit', () => console.log('Bye!'))
process.on('SIGINT', () => process.exit())
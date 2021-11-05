const fs = require('fs');
const path = require('path');

path1 = path.join("01-read-file", "text.txt");

const stream = fs.createReadStream(
    path1,
    'utf8'
);
stream.on('data', (data) => console.log(data));
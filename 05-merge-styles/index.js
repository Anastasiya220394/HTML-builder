const path = require('path');
const fs = require('fs');

let path1 = path.join(__dirname, "styles");
let path2 = path.join(__dirname, 'project-dist', "bundle.css");

fs.readdir(path1, { withFileTypes: true }, function(err, items) {
    if (err) {
        throw err;
    }
    const output = fs.createWriteStream(path2)
    items.forEach(function(item) {
        let a = path.parse(item.name).ext;
        if(item.isFile() === true && a == '.css')  {
            const input = fs.createReadStream(path.join(path1, item.name), 'utf-8');
            input.on('data', chunk => output.write(chunk))
            input.on('error', error => console.log('Error', error.message))
        }
    })
});
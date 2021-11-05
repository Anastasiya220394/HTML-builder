const path = require('path');
const fs = require('fs');

let path1 = path.join(__dirname, "template.html");
let path2 = path.join(__dirname, 'components')
let dirResult = path.join(__dirname, 'project-dist');

const template = fs.createReadStream(path1, 'utf8');


//создание индекс хтмл

fs.readFile(path1, function (
    error
  ) {
    fs.mkdir(dirResult, { recursive: true }, err => {
        if(err) throw err;
     });
     
    let string;
    writeTemplate= fs.createWriteStream(
        path.join(dirResult, 'index.html'),
        { withFileTypes: true },
      );

    let arrRead = [];
    let arrSamples = [];
    template.on('data', chunk => {
        string = chunk

        fs.readdir(path2, { withFileTypes: true }, function(err, elements) {
            if (err) {
                throw err;
            }
        elements.forEach((element) => {
        const readableElement = fs.createReadStream(
        path.join(path2, element.name),
        );
        let sample = path.basename(element.name, path.extname(element.name));
        arrRead.push(readableElement);
        arrSamples.push(sample);
        for (let i = 0; i < arrRead.length; i++) {
            arrRead[i].on('data', (data) => {
            string = string.replace(`{{${arrSamples[i]}}}`, data);
            if (i === arrRead.length - 1)
            writeTemplate.write(string);
          });
        }
      });
    });
    })
})


fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
    if(err) throw err;
 });

 //стили
let path3 = path.join(__dirname, "styles");
let path4 = path.join(__dirname, 'project-dist', "style.css");

fs.readdir(path3, { withFileTypes: true }, function(err, items) {
    if (err) {
        throw err;
    }
    const output = fs.createWriteStream(path4)
    items.forEach(function(item) {
        let a = path.parse(item.name).ext;
        if(item.isFile() === true && a == '.css')  {
            const input = fs.createReadStream(path.join(path3, item.name), 'utf-8');
            input.on('data', chunk => output.write(chunk))
            input.on('error', error => console.log('Error', error.message))
        }
    })
});


//копия
function copyFiles(src, dist) {
    fs.readdir(src, { withFileTypes: true }, (err, items) => {
        if (err) {
            throw err;
        }
        for (let item of items) {
          if (item.isDirectory()) {
            const secondSrc = path.join(src, item.name),
              secondDist = path.join(dist, item.name);
              copyFiles(secondSrc, secondDist);
          } else {
            fs.mkdir(dist, { recursive: true }, function(err) {
                if (err) {
                    throw err;
                }
            });
            fs.copyFile(
              path.join(src, item.name),
              path.join(dist, item.name), 
              function (err) {
                if (err)
                    throw err;
                }
            );
          }
        }
    }) 
};

copyFiles(path.join(__dirname, 'assets'), path.join(dirResult, 'assets'), function(err) {
    if (err) {
        throw err;
    }
})
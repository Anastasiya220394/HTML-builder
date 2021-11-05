const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if(err) throw err; // не удалось создать папку
    console.log('Папка успешно создана');
 });

 function copyFiles() {
    const srcFolder = 'files';
    const destinationFolder = 'files-copy';
    const srcDir = path.join(__dirname, srcFolder);
    const destDir = path.join(__dirname, destinationFolder);
    fs.readdir(srcDir, (err, files) => {
        if (err) {
            throw err;
        }
        for (let i = 0; i < files.length; i += 1) {
            fs.copyFile(srcDir + '/' + files[i], destDir + '/' + files[i], function (err) {
                if (err)
                    throw err;
            });
        }

    });
}

const directory = path.join(__dirname, 'files-copy');

fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
copyFiles();
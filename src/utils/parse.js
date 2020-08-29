const fs = require('fs');
const pdf = require('pdf-parse');
 
function parse(path) {
    const dataBuffer = fs.readFileSync(path);
 
    pdf(dataBuffer).then(function(data) {
        console.log(data.text);
        return data.text;
        // fs.writeFile("pdftotext.txt", data.text, error => {
        //     if (error) {
        //         throw error;
        //     }
        // });
    });
    
}

module.exports = parse;
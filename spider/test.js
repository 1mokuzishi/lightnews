const Crawler = require("crawler");
const fs = require("fs");

let crawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        done();
    }
});

crawler.queue({
   uri: 'http://www.example.com/image.jpg',
   filename: 'myImage.jpg',
   encoding: null,
   jQuery: false
});
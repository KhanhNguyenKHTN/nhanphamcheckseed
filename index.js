const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
var crypto = require('crypto');
var array = "abcdef0123456789";
var result = "";
var mainSeed = "";
function GenerateRanDomHash()
{
    var temp = "";
    for (let index = 0; index < 64; index++) {
        var rand = Math.floor(Math.random() * Math.floor(16));
        temp += array[rand];
    }
    return temp;
}
function checkSeed()
{
    mainSeed = GenerateRanDomHash();
    var seed = mainSeed;
    for (let index = 0; index < 50000; index++) {
        seed = crypto.createHash('sha256').update(seed).digest('hex');//lib.genGameHash(seed);
        if(seed === '8b4f68e52d9d2ef378b9dcd3330c81c610fd772af235c507e75510f18b5a9bc2')
        {
            result += "Seed: " + mainSeed + "    ***Index: " + index + "\n";
        }
    }    
}
//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
    
    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    var stringMess = "Dang chay\n";
    stringMess += mainSeed;
    stringMess += result;
    res.end(stringMess);
});
setTimeout(() => {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    })
}, 200);

setInterval(() => {
    checkSeed();
}, 0);
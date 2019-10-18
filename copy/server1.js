const { createServer } = require("http");

createServer((req, res) => {
    res.end("3000");
}).listen(3000, () => {
    console.log("port is 3000");
});
ww;

const cluster = require("cluster");
const cpunums = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`主进程${process.pid}`);
    let worker;
    for (let i = 0; i < cpunums; i++) {
        worker = cluster.fork();
    }
    worker.on("listening", () => {
        cluster.fork();
    });
} else {
    require("./index.js");
    console.log(`子进程${process.pid}`);
}

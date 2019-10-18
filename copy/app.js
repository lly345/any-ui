const os = require("os");
const cluster = require("cluster");
const cpuLength = os.cpus().length;
const logs = [];
if (cluster.isMaster) {
    let worker;
    for (let i = 0; i < cpuLength; i++) {
        worker = cluster.fork();
    }
    worker.on("exit", () => {
        const childprocess = cluster.fork();
        console.log("重启进程id:" + childprocess.process.pid);
    });
    worker.on("message", data => {
        logs.push(data.task);
        console.log(logs);
    });
    worker.on("listening", address => {
        console.log(
            `server is running at: ${address.port} 进程id:${worker.process.pid}`
        );
    });
} else {
    require("./app.js");
}

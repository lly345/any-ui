const { spawn, exec, execFile, fork } = require("child_process");

//将异步函数转为promise函数
const { promisify } = require("util");

const _execFile = promisify(require("child_process").execFile);

_execFile("node", ["--version"]).then(res => {
    console.log(res);
});
// 第一个参数为路径或文件名   可查看版本号
execFile("node", ["--version"], (error, stdout, stderr) => {
    if (error) {
        console.log(error);
    }
    console.log(stdout);
});

// 使用子进程exec执行windows的dos命令
exec(
    `copy 1.txt 2.txt`,
    {
        cwd: __dirname
    },
    error => {
        console.log(error);
    }
);

// 使用子进程spawn执行windows的dos命令
// ls显示当前路径下的文件名

const ls = spawn("ls");

// 通过子进程的实例对象，监听执行子进程的输出内容，并且在主进程中打印出来
ls.stdout.on("data", data => {
    console.log(data.toString());
});

// 通过进程启动服务

// const worker = exec("node server1.js");

// worker.stdout.on("data", data => {
//     console.log(data);
// });

// 通过进程启动多个服务

//exec
let count = 1;
function server(cmd) {
    const worker = exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
        }
    });
    worker.stdout.on("data", data => {
        console.log(data);
    });
    worker.on("exit", code => {
        console.log(code);
        if (code === 1) {
            if (count >= 3) return console.log("稍后再试");
            count++;
            setTimeout(() => {
                server(cmd);
            }, 2000);
        }
    });
}

// const servers = ["server1", "server2"];

// servers.forEach(servername => {
//     server(`node ${servername}.js`);
// });

//spawn
// let count = 1;
// function server(cmd) {
//     const worker = spawn("node", [cmd]);
//     worker.stdout.on("data", data => {
//         console.log(data.toString());
//     });
//     worker.stderr.on("data", data => {
//         console.log(data.toString());
//     });
//     worker.on("exit", code => {
//         console.log(code);
//         if (code === 1) {
//             if (count >= 3) return console.log("稍后再试");
//             count++;
//             setTimeout(() => {
//                 server(cmd);
//             }, 2000);
//         }
//     });
// }

// const servers = ["server1", "server2"];

// servers.forEach(servername => {
//     server(`${servername}.js`);
// });

//execFile
// let count = 1;
// function server(cmd) {
//     const worker = execFile("node", [cmd], (error, stdout, stderr) => {
//         if (error) {
//             console.log(error);
//         }
//     });
//     worker.stdout.on("data", data => {
//         console.log(data.toString());
//     });
//     worker.on("exit", code => {
//         console.log(code);
//         if (code === 1) {
//             if (count >= 3) return console.log("稍后再试");
//             count++;
//             setTimeout(() => {
//                 server(cmd);
//             }, 2000);
//         }
//     });
// }

// const servers = ["server1", "server2"];

// servers.forEach(servername => {
//     server(`${servername}.js`);
// });

//fork 守卫进程
// let count = 1;
// function server(cmd) {
//     const worker = fork(cmd);
//     worker.on("data", data => {
//         console.log(data.toString());
//     });
//     worker.on("exit", code => {
//         if (code === 1) {
//             // if (count >= 3) return console.log("稍后再试");
//             count++;
//             setTimeout(() => {
//                 server(cmd);
//             }, 2000);
//         }
//     });
// }

// const servers = ["server1", "server2"];

// servers.forEach(servername => {
//     server(`./${servername}.js`);
// });

console.log('checking for internet connection...')
const childProcess = require('child_process');
const { resolve } = require('path');
let isNetwork = false;

const ping = childProcess.spawn("ping", ['-w', '10', 'google.com']);
ping.stdout.on("data", (data) => {
    isNetwork = true;
    ping.kill('SIGINT')
})

ping.on("exit", async () => {
    if (isNetwork) {
        await installDeps()
    } else {
        console.log("No Internet!")
    }
    await startServers()
})


function installDeps() {
    return new Promise((resolve, reject) => {
        const installDeps = childProcess.spawn("npm", ['run', 'install-dependencies']);
        installDeps.stdout.on("data", (data) => {
            console.log(data.toString())
        })
        installDeps.on('exit', () => {
            resolve("")
        })
    })
}

function startServers() {
    return new Promise((resolve, reject) => {
        console.log("starting servers ...")
        const startServers = childProcess.spawn("npm", ['run', 'start-servers']);
        startServers.stdout.on('data', (data) => {
            console.log(data.toString())
        })
    })
}
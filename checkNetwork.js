const WINDOWS = "win32"

console.log('checking for internet connection...')
const childProcess = require('child_process');
let isNetwork = false;

let ping;
if (process.platform === WINDOWS) {
    ping = childProcess.spawn("powershell.exe", ["ping", '-w', '10', 'google.com']);
} else {
    ping = childProcess.spawn("ping", ['-w', '10', 'google.com']);

}

ping.stdout.on("data", (data) => {
    isNetwork = true;
    ping.kill('SIGINT')
})

ping.on("exit", async () => {
    if (isNetwork) {
        const message = await installDeps()
        console.log(message)
    } else {
        console.log("No Internet!")
    }
    await startServers()
})


function installDeps() {
    return new Promise((resolve, reject) => {
        let installDeps;

        if (process.platform === WINDOWS){
            installDeps = childProcess.spawn("powershell.exe", ["npm", 'run', 'install-dependencies'], { stdio: "inherit" });
        }else{
            installDeps = childProcess.spawn("npm", ['run', 'install-dependencies'], { stdio: "inherit" });
        }

        installDeps.on('exit', () => {
            resolve("Dependencied installed")
        })
    })
}

function startServers() {
    return new Promise((resolve, reject) => {
        console.log("starting servers ...")
        let startServers;

        if (process.platform === WINDOWS){
            startServers = childProcess.spawn("powershell.exe", ["npm", 'run', 'start-servers'], { stdio: 'inherit' });
        }else{
            startServers = childProcess.spawn("npm", ['run', 'start-servers'], { stdio: 'inherit' });
        }
    })
}

const spawn = require('node-pty').spawn
// pull down the latest version of the project before 
const gitPull = spawn('git', ['pull']);
gitPull.onData(function (data) {
    if (data.includes("unable to access")) {
        process.stdout.write("Internet Unavailable. Couldn't get updates." + "To get updates, make sure you have a strong Internet connection then restart the app\n")
    } else if (data.includes("Already up to date")) {
        process.stdout.write("App Files updated!" + '\n')
    }
})

gitPull.onExit(function () {
    // start the servers for both the frontend and the backend
    // if (process.platform === "linux") {
    const startBackend = spawn('npm', ['start'], { cwd: './backend' })
    const startFrontend = spawn('npm', ['start'], { cwd: './frontend' })

    startBackend.onData(function (data) {
        process.stdout.write(data)
    })

    startFrontend.onData(function (data) {
        console.log("Frontend: " + data.toString())
        // permit the server use another port 
        if (data.includes("Would you like to run the app on another port instead?")) {
            process.stdout.write(data)
            startFrontend.write('y\r')
        }
    })
    // }
})
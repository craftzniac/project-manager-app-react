
// start the servers for both the frontend and the backend
const spawn = require('node-pty').spawn

if (process.platform === "linux") {
    const startBackend = spawn('npm', ['start'], { cwd: './backend' })
    const startFrontend = spawn('npm', ['start'], {cwd: './frontend'})

    startBackend.onData(function (data) {
        process.stdout.write(data)
    })

    startFrontend.onData(function(data){
        console.log("Frontend: " + data.toString())
        if (data.includes("Would you like to run the app on another port instead?")){
            process.stdout.write(data)
            startFrontend.write('y\r')
        }
    })
}
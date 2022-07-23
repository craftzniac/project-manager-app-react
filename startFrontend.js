const spawn = require('child_process').spawn

process.env.PORT = "3000"
console.log("Starting Frontend ...")
initFrontend()


function initFrontend() {
    const startFrontend = spawn("npm", ["start"], {
         cwd: "./frontend",
         shell: true,
         stdio: "pipe",
    });

    startFrontend.stderr.on('data', (data) => {
          console.log(data.toString())
    })

    startFrontend.stdout.on("data", function (data) {
         if (data.includes("Something is already running on port")) {
               console.log("Something is already running on port " + process.env.PORT + ". Attempting to use another port...")
              startFrontend.kill("SIGINT");
              process.env.PORT = parseInt(process.env.PORT) + 1;
              initFrontend();
         }

         if (data.includes("Starting")) {
              console.log(
                   "View frontend on http://localhost:" +
                        process.env.PORT +
                        "/"
              );
         }
    });
}

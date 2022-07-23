const spawn = require('child_process').spawn
frontend()


function frontend() {
    console.log("installing frontend dependencies ..");
    const installFrontendDeps = spawn("npm", ["i"], {
         cwd: "./frontend",
         shell: true,
    });

    installFrontendDeps.stderr.on("data", function (data) {
         if (
              data
                   .toString()
                   .includes(
                        "This is a problem related to network connectivity"
                   )
         ) {
              throw new Error(
                   "Dependencies could not be installed! Make sure your internet is enabled"
              );
         }
    });

    installFrontendDeps.on("exit", function () {
         process.env.PORT = "3000";
         console.log("Starting frontend ...");
         initFrontend();
    });
}

function initFrontend() {
    const startFrontend = spawn("npm", ["start"], {
         cwd: "./frontend",
         shell: true,
         stdio: "pipe",
    });

    startFrontend.stdout.on("data", function (data) {
         if (data.includes("Something is already running on port")) {
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

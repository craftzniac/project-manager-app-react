let shell;
const spawn = require("child_process").spawn;

const LINUX = "linux";
const WINDOWS = "win32";

if (process.platform === WINDOWS) {
     shell = "powershell.exe";
} else if (process.platform === LINUX) {
     shell = "bash";
}

// Performs automatic update of the app files when it is run before the app is started
console.log("Searching for updates ...");
const gitPull = spawn(shell, ["git", "pull"], { cwd: ".", shell: true });

gitPull.stdout.on("data", function (data) {
     if (data.toString().includes("Already up to date")) {
          console.log("No updates available. App Files are up to date" + "\n");
          // process.stdout.write("App Files updated!" + '\n')
     } else {
          console.log("App Files updated to remote repo");
     }
});

gitPull.stderr.on("data", function (data) {
     if (data.toString().includes("unable to access")) {
          console.log(
               "Internet Unavailable. Couldn't get updates." +
                    "To get updates, make sure you have a strong Internet connection then restart the app\n"
          );
          // process.stdout.write("Internet Unavailable. Couldn't get updates." + "To get updates, make sure you have a strong Internet connection then restart the app\n")
     }
});

gitPull.on("exit", function () {
     // run npm i for the backend before starting the server
     console.log("Installing backend dependencies ...");
     const installBackendDeps = spawn(shell, ["npm", "i"], {
          cwd: "./backend",
          shell: true,
     });

     installBackendDeps.stderr.on("data", function (data) {
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

     installBackendDeps.on("exit", function () {
          console.log("Starting backend ...");
          const startBackend = spawn(shell, ["npm", "start"], {
               cwd: "./backend",
               shell: true,
          });

          startBackend.stderr.on("data", function (data) {
               throw new Error(data.toString());
          });

          startBackend.stdout.on("data", function (data) {
               // make sure the backend is fully started before launching the frontend server
               if (data.toString().includes("Backend Server started on port")) {
                    console.log(data.toString());
               }

               if (data.toString().includes("tables created successfully")) {
                    frontend();
               }
          });

          startBackend.on("exit", function () {
               console.log("Backend is down");
          });
     });
});

function frontend() {
     console.log("installing frontend dependencies ..");
     const installFrontendDeps = spawn(shell, ["npm", "i"], {
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
     const startFrontend = spawn(shell, ["npm", "start"], {
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

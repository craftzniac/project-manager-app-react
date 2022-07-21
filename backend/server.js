import express from "express";
import projectRouter from "./routes/projectRouter.js";
import boardRouter from "./routes/boardRouter.js";
import cardRouter from "./routes/cardRouter.js";
import cors from "cors";

const app = express();

let PORT = 4000;

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
     res.redirect("/api/v1/project");
});

app.use("/api/v1/projects/", projectRouter);

app.use("/api/v1/projects/boards", boardRouter);
app.use("/api/v1/projects/boards/cards", cardRouter);


function startServer(PORT_NUMBER){
     app.listen(PORT_NUMBER, () => {
          console.log('Server started on port: ' + PORT_NUMBER)
     }).on('error', (err) => {
          console.log("There was an error " + err.message)
          if (err.message.includes("EADDRINUSE")){
               console.log('Attempting to start server on a new port...')
               PORT_NUMBER += 1;
          }
          startServer(PORT_NUMBER)
     })
}

startServer(PORT);
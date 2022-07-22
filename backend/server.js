import express from "express";
import projectRouter from "./routes/projectRouter.js";
import boardRouter from "./routes/boardRouter.js";
import cardRouter from "./routes/cardRouter.js";
import cors from "cors";
import fs from "fs";

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

function startServer() {
     app.listen(PORT, () => {
          console.log("Backend Server started on port: " + PORT);
          const content = `const baseUrl = "http://localhost:${PORT}/api/v1";
          export default baseUrl;`;
          try {
               fs.writeFileSync("../frontend/src/pages/baseUrl.js", content);
          } catch (err) {
               console.error(err);
          }
     }).on("error", (err) => {
          console.log("There was an error " + err.message);
          if (err.message.includes("EADDRINUSE")) {
               console.log("Attempting to start server on a new port...");
               PORT += 1;
               startServer();
          }
     });
}

startServer();

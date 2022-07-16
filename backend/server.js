import express from "express";
import projectRouter from "./routes/projectRouter.js";
import boardRouter from "./routes/boardRouter.js";
import cardRouter from "./routes/cardRouter.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
     res.redirect("/api/v1/project");
});

app.use("/api/v1/projects/", projectRouter);

app.use("/api/v1/projects/boards", boardRouter);
app.use("/api/v1/projects/boards/cards", cardRouter);

app.listen(4000);

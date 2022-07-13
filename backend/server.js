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

app.use("/api/v1/project/board", boardRouter);
app.use("/api/v1/project/board/card", cardRouter);

app.listen(4000);

import { Router, urlencoded, json } from "express";
import Board from "../model/board.js";
import generateId from "../utils/general.js";

const boardRouter = Router();
boardRouter.use(urlencoded({ extended: true }));
boardRouter.use(json());

const db = new Board();

boardRouter
  .route("/")
  //add new board to db
  .post(async (req, res) => {
    const newBoard = await db.addBoard(
      generateId(),
      req.body.boardName,
      req.body.projectId
    );
    res.json(newBoard);
  })
  .put(async (req, res) => {
    try {
      const info = await db.updateBoardTitle(
        req.body.boardId,
        req.body.newTitle,
        req.body.projectId
      );
      res.json(info);
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const success = await db.deleteBoard(
        req.body.boardId,
        req.body.projectId
      );
      res.json(success);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default boardRouter;

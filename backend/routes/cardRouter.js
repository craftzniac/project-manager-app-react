import { Router, urlencoded, json } from "express";
import Card from "../model/card.js";
import generateId from "../utils/general.js";

const cardRouter = Router();
cardRouter.use(urlencoded({ extended: true }));
cardRouter.use(json());

const db = new Card();

cardRouter
     .route("/")
     .post(async (req, res) => {
          try {
               const newCard = await db.addCard(
                    generateId(),
                    req.body.boardId,
                    req.body.description
               );
               res.json(newCard);
          } catch (err) {
               res.status(500).json(err);
          }
     })
     .delete(async (req, res) => {
          try {
               const info = await db.deleteCard(req.body.id);
               res.json(info);
          } catch (err) {
               res.status(500).json(err);
          }
     })
     .put(async (req, res) => {
          try {
               const modifiedCard = await db.editCard(
                    req.body.id,
                    req.body.isCompleted,
                    req.body.description
               );
               res.json(modifiedCard);
          } catch (err) {
               res.status(500).json(err);
          }
     });

export default cardRouter;

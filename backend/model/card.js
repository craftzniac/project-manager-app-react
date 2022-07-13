import base from "./base.js";
export default class Card {
     #connection;

     constructor() {
          this.db = base;
          this.#connection = this.db.getConnection();
          this.SUCCESS = {
               status: "success",
          };
          this.FAILED = {
               status: "failed",
          };
     }

     getCard(id) {
          return new Promise((resolve, reject) => {
               const query = `SELECT * FROM card WHERE id = ?`;
               this.#connection.query(query, [id], (error, result) => {
                    if (!error) {
                         resolve(result[0]);
                    } else {
                         reject(this.FAILED);
                    }
               });
          });
     }

     addCard(id, boardId, description) {
          return new Promise((resolve, reject) => {
               let query = `INSERT INTO card (id, board_id, description) VALUES (?, ?, ?)`;
               this.#connection.query(
                    query,
                    [id, boardId, description],
                    async (error, result) => {
                         if (!error) {
                              const newCard = await this.getCard(id);
                              resolve(newCard);
                         } else {
                              reject(this.FAILED);
                         }
                    }
               );
          });
     }

     editCard(id, isCompleted, description) {
          return new Promise((resolve, reject) => {
               let query = `UPDATE card SET is_completed = ?, description = ? WHERE id = ?`;
               this.#connection.query(
                    query,
                    [isCompleted, description, id],
                    async (error, result) => {
                         if (!error) {
                              const modifiedCard = await this.getCard(id);
                              resolve(modifiedCard);
                         } else {
                              this.FAILED.error = error;
                              reject(this.FAILED);
                         }
                    }
               );
          });
     }

     deleteCard(id) {
          return new Promise((resolve, reject) => {
               const query = `DELETE FROM card WHERE id = ?`;
               this.#connection.query(query, [id], (error, result) => {
                    if (!error) {
                         resolve(this.SUCCESS);
                    } else {
                         reject(this.FAILED);
                    }
               });
          });
     }
}

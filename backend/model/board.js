import base from "./base.js";
export default class Board {
     #connection;

     constructor() {
          this.db = base;
          this.#connection = this.db.getConnection();
          this.SUCCESS = { status: "success" };
          this.FAILED = { status: "failed" };
     }

     addBoard(id, boardTitle, projectId) {
          return new Promise((resolve, reject) => {
               let query = `INSERT INTO board (id, title, project_id) VALUES (?, ?, ?)`;
               this.#connection.query(
                    query,
                    [id, boardTitle, projectId],
                    async (error, result) => {
                         if (!error) {
                              const board = await this.getEmptyBoard(id);
                              const projectBoardCount = (
                                   await this.db.getProjectBoards(projectId)
                              ).length;
                              resolve({ board, projectBoardCount });
                         } else {
                              reject(error);
                         }
                    }
               );
          });
     }

     getEmptyBoard(boardId) {
          return new Promise((resolve, reject) => {
               const query = `SELECT * FROM board WHERE id = ?`;
               this.#connection.query(query, [boardId], (error, result) => {
                    if (!error) {
                         resolve(result[0]);
                    } else {
                         reject(error);
                    }
               });
          });
     }

     updateBoardTitle(boardId, newTitle, projectId) {
          return new Promise((resolve, reject) => {
               let query = `SELECT title FROM board WHERE id = ? AND project_id = ?`;
               this.#connection.query(
                    query,
                    [boardId, projectId],
                    (error, result) => {
                         if (!error) {
                              // destructure and provide alias
                              const { title: oldTitle } = result[0];

                              query = `UPDATE board SET title = ? WHERE id = ? AND project_id = ?`;
                              this.#connection.query(
                                   query,
                                   [newTitle, boardId, projectId],
                                   (error, result) => {
                                        if (!error) {
                                             resolve({ oldTitle, newTitle });
                                        } else {
                                             this.FAILED.status = error;
                                             reject(this.FAILED);
                                        }
                                   }
                              );
                         } else {
                              this.FAILED.status = error;
                              reject(this.FAILED);
                         }
                    }
               );
          });
     }

     deleteBoard(boardId, projectId) {
          return new Promise((resolve, reject) => {
               let query = `DELETE FROM card WHERE board_id = ?`;
               this.#connection.query(query, [boardId], (error, result) => {
                    if (!error) {
                         query = `DELETE FROM board WHERE id = ? AND project_id = ?`;
                         this.#connection.query(
                              query,
                              [boardId, projectId],
                              async (error, result) => {
                                   if (!error) {
                                        const projectBoardCount = (
                                             await this.db.getProjectBoards(
                                                  projectId
                                             )
                                        ).length;
                                        const { status } = this.SUCCESS;
                                        resolve({ status, projectBoardCount });
                                   } else {
                                        reject(this.FAILED);
                                   }
                              }
                         );
                    }
               });
          });
     }
}

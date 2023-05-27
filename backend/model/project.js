import baseDb from "./base.js";
export default class Project {
     #connection;

     constructor() {
          this.db = baseDb;
          this.#connection = this.db.getConnection();
          this.SUCCESS = { status: "success" };
          this.FAILED = { status: "failed" };
     }

     getAllProjects() {
          return new Promise((resolve, reject) => {
               const query = "SELECT * FROM project";
               this.#connection.query(query, async (error, projects) => {
                    if (!error) {
                         const modifiedProjectList = [];
                         for (let project of projects) {
                              project.boardCount = (
                                   await this.getProjectBoards(project.id)
                              ).length;
                              modifiedProjectList.push({
                                   id : project.id,
                                   name: project.name,
                                   boardCount: project.boardCount,
                                   dateCreated: project.date_created
                              });
                         }

                         resolve(modifiedProjectList);
                    } else {
                         reject(error);
                    }
               });
          });
     }

     getProjectBoards(projectId) {
          return this.db.getProjectBoards(projectId);
     }

     getProject(id) {
          return new Promise((resolve, reject) => {
               let query = `SELECT * FROM project WHERE id = ?`;
               this.#connection.query(query, [id], async (error, result) => {
                    if (!error) {
                         //result is returned as an array even if the result is just 1 item
                         const proj = result[0];
                         
                         if (proj == null) {
                              reject({ error: "project does not exist" });
                              return;
                         }

                         const project = {
                              id: proj.id,
                              name: proj.name,
                              dateCreated: proj.date_created
                         }

                         const unprocessedBoards = await this.getProjectBoards(
                              project.id
                         );
                         const boards = [];
                         for (let board of unprocessedBoards) {
                              const cards = await this.getCards(board.id);
                              board.cards = cards;
                              boards.push(board);
                         }

                         project.boards = boards;
                         project.boardCount = boards.length;
                         // console.log(project)

                         resolve(project);
                    } else {
                         reject(error);
                    }
               });
          });
     }

     getCards(boardId) {
          return new Promise((resolve, reject) => {
               const query = `SELECT * FROM card WHERE board_id = ?`;
               this.#connection.query(query, [boardId], (error, result) => {
                    if (!error) {
                         result = result.map(card => {
                              return {
                                   id: card.id,
                                   description: card.description,
                                   boardId: card.board_id,
                                   isCompleted: card.is_completed
                              }
                         })
                         resolve(result);
                    } else {
                         reject(error);
                    }
               });
          });
     }

     addProject(projectId, projectName) {
          return new Promise((resolve, reject) => {
               let query = `INSERT INTO project (id, name) VALUES (? , ?)`;
               this.#connection.query(
                    query,
                    [projectId, projectName],
                    (error, result) => {
                         if (!error) {
                              query = `SELECT * FROM project WHERE id = ?`;
                              this.#connection.query(
                                   query,
                                   [projectId],
                                   async (error, result) => {
                                        if (!error) {
                                             const proj = result[0]

                                             resolve({ id: proj.id, 
                                                  name: proj.name, 
                                                  boardCount: 0, 
                                                  dateCreated: proj.date_created 
                                             });
                                        } else {
                                             reject(error);
                                        }
                                   }
                              );
                         } else {
                              reject({
                                   message: "failed to add project to database",
                                   error,
                              });
                         }
                    }
               );
          });
     }

     deleteProject(projectId) {
          return new Promise((resolve, reject) => {
               let query = `SELECT id FROM board WHERE project_id = ? `;
               this.#connection.query(
                    query,
                    [projectId],
                    async (error, boardList) => {
                         if (!error) {
                              boardList.forEach(async (board) => {
                                   const message =
                                        await this.deleteCardsOfBoard(board.id);
                                   if (message == this.FAILED) {
                                        reject(this.FAILED);
                                   }
                              });

                              const message = await this.deleteBoardsOfProject(
                                   projectId
                              );
                              if (message == this.FAILED) {
                                   reject(this.FAILED);
                              } else {
                                   const message =
                                        await this.deleteEmptyProject(
                                             projectId
                                        );
                                   if (message == this.FAILED) {
                                        reject(this.FAILED);
                                   } else {
                                        resolve({id: projectId, status: this.SUCCESS.status});
                                   }
                              }
                         } else {
                              reject(this.FAILED);
                         }
                    }
               );
          });
     }

     deleteCardsOfBoard(boardId) {
          return new Promise((resolve, reject) => {
               let query = `DELETE FROM card WHERE board_id = ? `;
               this.#connection.query(query, [boardId], (error, result) => {
                    if (!error) {
                         resolve(this.SUCCESS);
                    } else {
                         reject(this.FAILED);
                    }
               });
          });
     }

     deleteBoardsOfProject(projectId) {
          return new Promise((resolve, reject) => {
               const query = `DELETE FROM board WHERE project_id = ?`;
               this.#connection.query(query, [projectId], (error, result) => {
                    if (!error) {
                         resolve(this.SUCCESS);
                    } else {
                         reject(this.FAILED);
                    }
               });
          });
     }

     deleteEmptyProject(projectId) {
          return new Promise((resolve, reject) => {
               const query = `DELETE FROM project WHERE id = ? `;
               this.#connection.query(query, [projectId],  (error, result) => {
                    if (!error) {
                         resolve(this.SUCCESS);
                    } else {
                         reject(this.FAILED);
                    }
               });
          });
     }
}

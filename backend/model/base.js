import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

class BaseDb {
     #connection;

     constructor() {
          if (
               process.env.DB_NAME == null ||
               process.env.DB_USER == null ||
               process.env.DB_USER_PASSWORD == null
          ) {
               throw new Error(
                    "You have not created a .env file in your project root or maybe you have not declared 'DB_NAME' or 'DB_USER' or 'DB_USER_PASSWORD' in the .env file"
               );
          }
          this.#connection = mysql.createConnection({
               host: "localhost",
               user: process.env.DB_USER,
               password: process.env.DB_USER_PASSWORD,
               database: process.env.DB_NAME,
          });
          this.#connection.connect();
          this.createTables();
     }

     getConnection() {
          return this.#connection;
     }

     createTables() {
          const createProjectTable = {
               query: `CREATE TABLE IF NOT EXISTS project (id VARCHAR(20)  PRIMARY KEY, 
                                                    name VARCHAR(300) NOT NULL,
                                                    date_created DATE NOT NULL DEFAULT(CURRENT_DATE)
                                                    )`,
               tableName: "project",
          };

          const createBoardTable = {
               query: `CREATE TABLE IF NOT EXISTS board (id VARCHAR(20) PRIMARY KEY, 
                                                    title VARCHAR(300) NOT NULL,
                                                    project_id VARCHAR(20) NOT NULL,
                                                    date_created DATE NOT NULL DEFAULT(CURRENT_DATE)
                                                )`,
               tableName: "board",
          };

          const createCardTable = {
               query: `CREATE TABLE IF NOT EXISTS card (id VARCHAR(20) PRIMARY KEY, 
                                                    description TEXT NOT NULL,
                                                    board_id VARCHAR(20) NOT NULL,
                                                    is_completed BOOLEAN NOT NULL DEFAULT(FALSE)
                                                )`,
               tableName: "card",
          };

          const queryList = [
               createProjectTable,
               createBoardTable,
               createCardTable,
          ];

          for (let query of queryList) {
               this.#connection.query(query.query, (error, result) => {
                    if (!error) {
                         console.log(`${query.tableName} table created`);
                    } else {
                         console.log(
                              `${query.tableName} table not created.  ${error}. Check your database connection!`
                         );
                    }
               });
          }
     }

     getProjectBoards(projectId) {
          return new Promise((resolve, reject) => {
               const query = `SELECT * FROM board WHERE project_id = ? ORDER BY date_created DESC`;
               this.#connection.query(query, [projectId], (error, result) => {
                    if (!error) {
                         resolve(result);
                    } else {
                         reject(error);
                    }
               });
          });
     }
}

const base = new BaseDb();
Object.freeze(base);
export default base;

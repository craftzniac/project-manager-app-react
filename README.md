# Project Manager App

## Project Description

Manage your notes as projects, group todos into boards and add todos as cards. 
Currently, there are two pages, the index page and the project details page

### Index page is where all your projects or notes are displayed and you can add new project

![index page](./public/assets/index.png)

### Project details page

![note in detail](./public/assets/details.png)

## Try out this project on your machine
- Clone the project
`git clone https://github.com/MikeyOnyedika/project-manager-app.git`
- Install xampp if you don't already have mysql setup locally [download xampp here](https://xampp.org). Make sure to check the mysql server option when installing xampp
- Open the xampp control panel and fire up the mysql server
- open `localhost/phpmyadmin` on your browser
- create a database and setup a user account for that database
- open your project in vscode [download vscode here](https://code.visualstudio.com/)
- open the terminal on vscode and run `npm i` to install all dependencies for the project
- create a file named .env in your project structure root and add the database info there. Here's a sample
```env
DB_NAME=project-manager-app
DB_USER=root
DB_USER_PASSWORD=admin333
```
- start the node server by running
`npm start` in the vscode terminal

Happy Coding!!

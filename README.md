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
`git clone https://github.com/MikeyOnyedika/project-manager-app-react.git`
- Install XAMPP if you don't already have mysql setup locally [download xampp here](https://xampp.org). Make sure to check the mysql server option when installing XAMPP
- Open the XAMPP control panel and fire up the mysql server
- open `localhost/phpmyadmin` on your browser
- Create a database and setup a user account for that database to match the specification in backend/.env like as below. 
```env
DB_NAME=project-manager-app
DB_USER=root
DB_USER_PASSWORD=admin333
```
**Note:** You can also decide to change the database credentials in this backend/.env but make sure they are the same credentials used to create the database in XAMPP
- Open a terminal/Command prompt in root of the project and run `npm start`, then wait for the project to be set up. This may take some time so you may want to go grab a coffee or watch one or two youtube videos or check your messages on facebook/discord/telegram.
- To contribute to this project, open a pull request and I will be sure to check it out. Also, if you find bugs or thing of any improvements to the project, kindly open an Issue. 

Happy Coding!! 🎉

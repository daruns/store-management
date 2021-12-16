# BACKEND INSTRUCTIONS

## Nestjs Knex Objection js rest API

 > `nest-knex` uses Typescript, Node.js and mysql with famous library objectionjs and knex.


## Quick Start

```bash
# change directory to server folder
$ cd backend
```
## Installation
Install dependencies and devDependencies:
```bash
$ yarn install
```
## Configuration
Configuration environment and change basic credentials:
```bash
$ cp .env.example .env
```
## Create Database if you wanna use local database
```bash
$ mysql -u root -p
-> password:- ****
$ create database store-management
```

## run migration files to create tables
```bash
$ yarn run migrate:latest
```

## run seeds files to create dummy data around 1500 rows for each table
```bash
$ yarn run seeds:run
```

## Create folder for uploaded files
```bash
$ mkdir uploads
```

## Start Server

Start the nest server:
```bash
$ yarn start
```
Start the nest development server:

```bash
$ yarn start:dev
```

## Useful yarn commands

  * `yarn build` - Transpile TypeScript code
  * `yarn start` - Run application
  * `yarn start:dev` - Run application in development mode
  * `yarn run format` - Formate code with pritter
  * `yarn run lint` - Run for typescript linting
  * `yarn run test` - Run for test
  * `yarn run migrate:make` - Run for create migration with name of migration
  * `yarn run migrate:latest` - Run for migrate and create schema
  * `yarn run migrate:rollback` - Run for rollback batch migration
  * `yarn run seed:make` - Run for create seed file to seeding database
  * `yarn run seed:run` - Run for seeding database
  
## Docs & Community

  * [#Nest](https://nestjs.com/) for node js framework
  * [#mysql](https://www.mysql.com/) for database
  * [#Objectionjs](https://vincit.github.io/objection.js/) 
  * [#Knexjs](http://knexjs.org/) 
  * [#Jest](https://jestjs.io/) for Official testing tools
  * [#Yarn](https://yarnpkg.com/lang/en/) for Official package manager
  * [#CodeEditor](https://code.visualstudio.com/) Official text editor
  * [#StackOverflow](https://stackoverflow.com) thanks for helping and provide solution on every problem 


## Stay in touch

- Author - [Ashok Patidar](https://github.com/daruns)
- Stackoverflow - [Ashok](https://stackoverflow.com/users/9003945/m1-e1r0r)
- Github - [Alx Patidar](https://github.com/daruns)

## License
  Nest is [MIT licensed](LICENSE).

---------------------------------------------------------------------------------------------

# FRONTEND INSTRUCTIONS

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

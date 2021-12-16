# Nestjs Knex Objection js rest API

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
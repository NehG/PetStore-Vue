# PETSTORE - VUE-VUEX

The PET Store is build with [`Vue.js`](https://vuejs.org), which is a progressive JavaScript framework. <br />
It is powered by Serverless [`AWS Lambda REST API`](https://r9zmffb9h7.execute-api.ca-central-1.amazonaws.com/prod/products) using NodeJS.

<small><b>FYI:</b> <i>Same application is also build using [`React-Redux`](https://github.com/NehG/PetStore).</i></small>

## FUNCTIONALITY

#

✅ Add & remove element from list

✅ List Structure

✅ State and Store management using vuex

✅ Ability to save and load application from local storage

✅ Custom API using express and node.js

✅ Unit testing using Jest

✅ AWS Serverless API using NodeJS

## STATE OVERVIEW

#

![Initial State](https://i.imgur.com/EVRSF9E.png)

## USAGE

#

Run application as dev :

`npm run serve`

Run jest tests :

`npm run jest`

Run jest tests with `--coverage` and `--verbose`

`npm run jest:desc`

## TECH-STACK

#

Pet Store uses a number of open source projects to work properly:

- [AWS](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-api.html) - Serverless AWS Lambda API using NodeJS.
- [Github](https://github.com/NehG) - Version control
- [Jest](https://jestjs.io/docs/en/) - Testing web application.
- [LogRocket](https://logrocket.com) - Logger
- [NodeJS](https://nodejs.org/en/) - Lambda API's
- [Vue](https://vuejs.org) - The Progressive
  JavaScript Framework!
- [Vuetify](https://vuetifyjs.com/en/) - Material Design
  Component Framework build on top of Bootstrap.
- [Vuex](https://vuex.vuejs.org) - State management Library + Pattern

## UNIT TESTS

#

<small>`NOTE: Unit testing is heavily focused on "Products"`</small>

Tests:

![Unit Test](https://i.imgur.com/nnVPwxR.png)

Coverage:

![Coverage](https://i.imgur.com/7zddjXK.png)

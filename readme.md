Simple Node API server with React dashboard
==================================

Demo on Heroku: [https://node-react-challenge.herokuapp.com/](https://node-react-challenge.herokuapp.com/)

This app allows you to fetch a list of sample data through the API, as well as creating records via JSON as text. You can setup the connection to an actual database, but the data in the demo is initialized via in-memory storage, and therefore will not persist.

Features/Technologies used:
- Node.js and React.js
- Express
- Redux for state management
- In-memory storage
- Nodemon auto-restarting for server-side code
- Hot reloading for client-side code
- Jest

Getting started
---------------

```sh
# Clone this repo
git clone https://github.com/bhml/node-react-redux-example.git
cd node-react-redux-example

# Install dependencies
yarn or npm install

# Start the development server
npm run dev
```

and check it out: http://localhost:3000

Running tests
-------------

```sh
# Using Jest
npm test

# Eslint
npm run lint
```

Production build
-------------

```sh
# Just run build, this command runs:
# npm run build:server - using Babel cli to compile server-side code
# npm run build:client - using Webpack to build/bundle the client assets
# which will create a dist folder in root
npm run build

# Start the production server
npm start
```

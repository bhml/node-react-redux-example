Simple Node API server with React dashboard
==================================

Demo on Heroku: [https://node-react-challenge.herokuapp.com/](https://node-react-challenge.herokuapp.com/)

Features/Technologies used:
- Node.js and React.js
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

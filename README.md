# (App Name) API

## Setup

```sh
This Boilerplate is specific to one project, but it just needs your specific db, tables, seeds, migrations and routes inserted properly.
```
### Command Line

```sh
express --git .
npm install
npm uninstall jade http-errors
npm install pg knex cors body-parser
createdb  < databaseName(userinput) >
knex migrate:make < your migration file name here  (user_input) >
knex seed:make < your seed file name here (user_input_seeds) >
knex migrate:latest
knex seed:run
```

### Manually

```sh
delete routes and views folders

create a db folder with queries.js and connections.js files in it

create api folder with userinput.js file (routes)
```

### queries.js file looks like this

```sh
const db = require("./connections");

module.exports = {
  getAll() {
    return db("user_input");
  },
  list() {
    return db("user_input");
  },
  read(userName) {
    return db("user_input")
      .select()
      .where("userName", userName);
    //   .first();
  },
  create(user) {
    return db("user_input")
      .insert(user)
      .returning("*")
      .then(record => record[0]);
  },
  update(userName, user) {
    return db("user_input")
      .update(user)
      .where("userName", userName)
      .returning("*")
      .then(record => record[0]);
  },
  delete(userName) {
    return db("user_input")
      .delete()
      .where("userName", userName)

  }
};
```

### connections.js looks like this

```sh
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);

module.exports = connection;
```

### Package.JSON looks like this

```sh
{
  "name": "server",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "cookie-parser": "~1.4.3",
    "cors": "^2.8.4",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "knex": "^0.15.2",
    "morgan": "~1.9.0",
    "pg": "^7.4.3"
  },
  "devDependencies": {
    "nodemon": "^1.18.3"
  }
}
```

### userinput.js (routes) looks like this

```sh
const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

router.get('/', async (req, res) => {
    const userinput = await queries.getAll();
    res.json(userinput);
    //
    // THE .THEN VERSION
    // queries.getAll()
    // .then(dogs => {
    //  res.json(headlines);
    //});
})

router.get("/:userName", (request, response, next) => {
    queries.read(request.params.userName).then(user => {
        user
            ? response.json({user})
            : response.status(404).json({message: 'Not found'})
    }).catch(next);
});

router.post("/", (request, response, next) => {
    queries.create(request.body).then(user => {
        response.status(201).json({user: user});
    }).catch(next);
});

router.delete("/:userName", (request, response, next) => {
    queries.delete(request.params.userName).then(() => {
        response.status(204).json({deleted: true});
    }).catch(next);
});

router.put("/:userName", (request, response, next) => {
    queries.update(request.params.userName, request.body).then(user => {
        response.json({user: user});
    }).catch(next);
});

module.exports = router; 
```

### migrations file (user_input.js) looks like this

```sh
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_input", table => {
    table.string("userName");
    table.string("source");
    table.string("domain");
    table.string("keywords");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_input");
};
```

### seeds file (user_input_seeds.js) looks like this

```sh
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("user_input")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_input").insert([
        {
          userName: "Jeff",
          source: "http://www.bbc.co.uk/news",
          domain: "bbc.co.uk",
          keywords: "World Cup"
        },
        {
          userName: "putintrump",
          source: "http://www.usatoday.com/news",
          domain: "usatoday.com",
          keywords: "Putin Trump"
        },
        {
          userName: "JB",
          source: "https://www.washingtonpost.com",
          domain: "washingtonpost.com",
          keywords: "Trump Russia"
        }
      ]);
    });
};
```



```sh
npm install
```

## Usage

```sh
npm start
```

## Development

```sh
npm run dev # starts nodemon on port 3000
```

## Initial DB Schema

![](https://www.lucidchart.com...)

Link to [Client Repo](https://github.com/jeff-burns...)
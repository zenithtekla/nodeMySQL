# ROADMAP

#### le 7, septembre 2016
- extends layout for module view (validate if no view engine conflicts)
- validates if findOrCreate() works for query_text field in query_approvals app
- path.resolve for module files that require core https://github.com/zenithtekla/TailsObs/blob/master/tailapp/modules/customers/server/controllers/customers.server.controller.js

#### le 3, septembre 2016
- investigating and exploiting the guts of mantisBT.
- provided planning of database migration, ref: http://www.slideshare.net/matkeep/migrating-from-relational-databases-to-mongodb
- provided user.json to showcase how users and their tasks are grouped in the same collection.
- users and tasks are two tables, aka documents in MongoDB lingo. They are documents to the collection.

#### le 30, août 2016
- push Koa experiment to another branch
- sync local and remote

#### le 28, août 2016
- modified core config for more flexibility in Express rendering
- generalized some code and Schema for dbModels
- pending addition of multiple view engines
- pending addition of bundleDependencies

#### le 26, août 2016
- added script in package.json, allowing the server to start by 'npm run dev' in terminal
- in .eslintrc.js, appended lodash rules for linting
- added `eslint` and `karma` as `devDependencies` for `package.json`
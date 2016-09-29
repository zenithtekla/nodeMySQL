# ROADMAP
#### le 28, septembre 2016
- Calibrate sequelize CRUD methods. (completed)

#### le 20, septembre 2016
- Desired packages:
  + Brunch to solve roadblocks of using SCSS instead of CSS for fast build
     + For simplicity, live-reload and production ready in development process.
  + Angular2-TypeScript for simplicity in the building of reusable UI components instead of individual non-inheritable modules.
  + Isomorphic back-end with Express code refactored to .ts files.
  + Passport Auth
  + Mocha-SuperTest

- Desired features:
  + SCSS for @extend and mixins.. needs Brunch|Webpack
  + Angular2-TypeScript components
  + Express code converted into .ts
  + Angular2-Universal
  + Adjustment to make sure Sequelize and Mongoose (singleton -https://github.com/outlandishideas/nodejs-mean-with-brunch-sass-passport/blob/master/server.js#L41) work on the application.
- Refs:
  + http://brianflove.com/2016/03/29/typescript-express-node-js/
  + http://stackoverflow.com/questions/36156916/how-to-load-angular-2-with-systemjs-in-a-brunch-io-app
  + angular2-universal-starter looks promising: server, both, client.
  + https://github.com/brunch/brunch/issues/453
  + http://outlandish.com/blog/creating-a-node-js-mean-web-application-with-brunch-sass-and-passport/
  + https://github.com/bapatel1/Learning-Angular-2.0/tree/master/class-7_TwoWayBinding
  + https://justindujardin.github.io/ng2-material/#/
  + http://taswar.zeytinsoft.com/2014/08/05/jade-include-template-inheritance-part-6/
  + https://devcenter.heroku.com/articles/nodejs-mongoose
- pending:
  + review Brunch build tool for SCSS rendering (plugin: sass-brunch)
  + ng2-brunch (repo) is good candidate for impl of sass-brunch (testing required!)
  + ng2-express: turn express into .ts files! review & impl.
  + passport & brunch-sass: review brunch-sass-passport
  + implementation of mocha, supertest -> review koa-viewrendering/test.js for simplified impl.

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
# Weather App

This is app was built in my spare time over a week as part of a coding challenge. I'm currently looking for a new position in Seattle - Hire me!

<div align="center">
  <img src="https://cdn.rawgit.com/tylercrosse/weather-app/a379810e/public/weather-app.jpg" alt="preview image">
</div>

---
### Demo

You can test a fully working live demo at http://calm-forecast.com/

---
### Major features

- Current & forecasted weather for any location. Weather data from the [dark sky api](https://darksky.net/dev/).
- Location search with autocomplete, with help from the [google places service](https://developers.google.com/maps/documentation/geocoding/intro).
- Charts showing forecasted weather for the next week & the weather that already occurred today.
- Search history stored in session.

---
### Wish List
The things I would like to do if I had more time

- [ ] Better test coverage
- [ ] Responsive design
- [ ] More complete PWA support
- [ ] Push deployment to cloud service (probably Digital Ocean or AWS)
- [ ] Display additional data

---
### Built with

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/react.svg"> [React](https://facebook.github.io/react/)

React makes it really easy to focus on the view in a declarative way. I like that it makes it easy to write composable, testable UI. Visualizatin handled by [react vis](https://github.com/uber/react-vis), a d3 powered react component library.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/redux.svg"> [Redux](http://redux.js.org/)

Redux is where the fun is at. It was used to manage state across the application in a predictable imperative way. [Redux devtools](https://github.com/zalmoxisus/redux-devtools-extension) are also great, I kept it enabled on production for anyone wanting to easily take a look at the app's state. [Redux persist](https://github.com/rt2zz/redux-persist) allowed the state to be easily persisted across browser sessions.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/webpack.svg"> [Webpack 2](https://webpack.js.org/)

Fantastic code bundler once you get past the learning curve. I use it for a number of things including: transpile ES2015+ javascript to ES5 with [Babel](https://babeljs.io/), compile [Sass](http://sass-lang.com/) into css, optimize assets, hot reload code, build minimized split production code, + more.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/express.svg"> [Express](https://expressjs.com/)

It's nice to have JS everywhere. Express is fast and minimal. The backend is pretty simple with a router, a few controllers, and basic http requests to cross origin resources.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/jest.svg"> [Jest](http://facebook.github.io/jest/)

Unit tests run by Jest. If you haven't seen Jest recently, you should take another look. [Enzyme](https://github.com/airbnb/enzyme) is used for React support and [SuperTest](https://github.com/visionmedia/supertest) is used for HTTP assertions. [Enzyme-to-JSON](https://github.com/adriantoine/enzyme-to-json) is also great and worth checking out in conjunction with the other test utilities.

---
### Setup

If you don't have [yarn](https://yarnpkg.com/en/) commands can be run with `npm`. First, clone and cd into the repo and install the dependencies.

```sh
$ git clone https://github.com/tylercrosse/gitter-clone.git
$ cd gitter-clone
$ yarn install
```

Additional commands:
##### `yarn dev`
- Start development server on `127.0.0.1:3000`

##### `yarn build`
- Build a production version of the app.

##### `yarn start`
- Start production server on `127.0.0.1:3000` to serve built app. Requires the build command to have already been run.

##### `yarn test`
- Run all of the projects tests using jest.

##### `yarn lint`
- Lint all of the projects javascript files using eslint.

---
### Contributing

Thank you for your interest! Unfortunately, I'm not currently taking contributions.

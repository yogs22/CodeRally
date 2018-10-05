![coderally Logo](./docs/logo.png)

[![join chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/coderally/Lobby)

A project listing board for app and web developers

Hosted at https://coderally.co/

## Technology
Powered by [https://reactjs.org/](React).

The NodeJs, ExpressJS backend for this project is located here: https://github.com/TheWillG/CodeRally-API.git.

## Install

`git clone https://github.com/TheWillG/CodeRally.git`

`cd CodeRally`

`npm install`

## Run

`npm run start`

## Styling

Sass is used for styling. All `.scss` files are compliled into `.css` in the same directory.

## Environment

| Name | Description | Example |
|------|-------------|--------|
| REACT_APP_API_URL | API url | http://localhost:3003/api/v1 |

*REACT_APP_API_URL* can be substituted with *https://coderally-98c5c.appspot.com/api/v1* if you are only working on this project and **not** the backend project. However, this app must be served on port **3000** to pass the whitelisting.

The backend is live at that url.

The environment variables are in *.env*.

## CI/CD

We use Netlify for continuous deployment. There are no integration or unit tests for this app.

Netlify is triggered by changes to the `master` branch.

## Contributing

We are always willing to accept contributions to this project.

## Contributors

[Will Garcia](https://github.com/thewillg/) ([LinkedIn](https://www.linkedin.com/in/thewillg/))

# Fastify to-do app

This to-do app was made by following along the project on the book [Accelerating Server-Side Development with fastify](https://www.packtpub.com/product/accelerating-server-side-development-with-fastify/9781800563582) by Manuel Spigolon, Maksim Sinik, and Matteo Colina.

The original source code included with the book can be found [here](https://github.com/PacktPublishing/Accelerating-Server-Side-Development-with-Fastify)

## Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Dependencies
To run this project locally you will need:

- [Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)
- NodeJS >= v18

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**IMPORTANT:** For the project to run locally, either the `mongo:start` command needs to be run first or the `MONGO_URL` variable needs to be set to a valid mongodb URL.

### `npm run mongo:start`

Starts a docker containerized instance of MongoDB in detached mode. The Docker daemon needs to be running before the command is executed.

### `npm run mongo:stop`

Stops the running docker containerized instance of MongoDB.

### `npm start`

For production mode

### `npm run test`

Run the test cases. To run the tests, a local instance of Docker needs to be installed, and the Docker daemon needs to be running.

### `npm run zipkin:start`

Starts a docker containerized instance of [Zipkin](https://zipkin.io) in detached mode. The Docker daemon needs to be running before the command is executed.

### `npm run zipkin:stop`

Stops the running docker containerized instance of [Zipkin](https://zipkin.io).

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

# Chat System Design Demo

## Quick start

This demo requires [Docker](https://www.docker.com) to be installed and running.

Run the following command in Terminal to launch the project and visit http://localhost:3000/.

> docker-compose up

_(You can terminate the server pressing `Ctrl + C`.)_

## How it works?

`docker-compose` [command](https://docs.docker.com/compose/reference/overview/) will read `docker-compose.yml` file and will create many containers defined there.

Each container is a virtual machine running [Linux](https://en.wikipedia.org/wiki/Linux) and pre-installed set of software (from Docker Hub) and any extra commands we specify.

It will start with downloading base images from Docker Hub and will continue based on `Dockerfile` [instructions](https://docs.docker.com/engine/reference/builder/#from) specified for each container.

`docker-compose` will be showing all log messages from all running containers in real-time.

## We use Docker for this demo becauses:
 * it provides virtualization, so it works the same on any computer
 * it works on Windows, Linux and macOS which allows more people to run this project
 * it uses a lightweight OS-level virtualization so all containers can fit into one physical machine
 * docker-compose tool comes included with Docker and allows creating containers with a couple of lines of code
 * [Docker Hub](https://hub.docker.com) provides many official pre-packaged software applications (Apache, Nginx, MySQL etc.)

More info:
 * [Virtual machine](https://en.wikipedia.org/wiki/Virtual_machine)
 * [Docker — A Beginner’s guide to Dockerfile with a sample project](https://medium.com/bb-tutorials-and-thoughts/docker-a-beginners-guide-to-dockerfile-with-a-sample-project-6c1ac1f17490)
 * [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
### Create a docker image

- command: $ docker build -t <image-name> .
- docker build -t productservice .

### Run the docker container with the image

- command: $ docker run -p <host-port>:<container-port> <image-name>
- docker run -p 3002:4000 productservice

Replace <host-port> with the port you want to expose on your local machine, <container-port> with the port specified in the Dockerfile, and <image-name> with the name you chose when building the Docker image.

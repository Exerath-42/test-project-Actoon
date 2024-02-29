# Test project for Actoon

## Requirements

To run this project, you will need:

- Docker: [Docker installation instructions](https://docs.docker.com/get-docker/)
- File `main.js`
- File `insrtuctions.txt`

## Installation and Running

1. Clone the repository:

   ```bash
   git clone https://git@github.com:Exerath-42/test-project-Actoon.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your_project
   ```

3. Ensure that the files `main.js` and `insrtuctions.txt` are in the project directory.

4. Build the Docker image:

   ```bash
   docker build -t my-node-app .
   ```

5. Run the container:

   ```bash
   docker run --rm my-node-app
   ```

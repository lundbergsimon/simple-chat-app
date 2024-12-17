# Vite React Typescript Chat App

This is a simple chat application built using [Vite](https://vite.dev/), [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [Socket.io](https://socket.io/). The app can be run locally using either Docker or Node.js.

## Features

- Real-time chat functionality.
- Supports running via Docker or directly with Node.js.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

## Getting Started

Choose one of the following methods to get the app up and running:

### Option 1: Running with Node.js

#### Development Mode

1. Clone the repository and navigate to the app folder:
    ```bash
    git clone https://github.com/lundbergsimon/chat-app.git
    cd chat-app
    ```

2. Navigate to the backend folder and Install the dependencies:
    ```bash
    cd ./backend
    npm install
    ```

3. Navigate to the frontend folder and install the dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Navigate back to the root folder and start the development server:
    ```bash
    cd ../
    npm run dev
    ```

5. Open your browser and navigate to http://localhost:3000 to see the app runnning in **development mode**.

#### Production Mode

1. Clone the repository and navigate to the app folder:
    ```bash
    git clone https://github.com/lundbergsimon/chat-app.git
    cd ./chat-app
    ```
2. Navigate to the backend folder and Install the dependencies:
    ```bash
    cd ./backend
    npm install
    ```

3. Navigate to the frontend folder and install the dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Naviagte back to the root folder and build the production server:
    ```bash
    cd ../
    npm run build
    ```

5. Start the production server:
    ```bash
    npm run preview
    ```

6. Open your browser and navigate to http://localhost:3000 to see the app runnning in **production mode**.

### Option 2: Running with Docker

Before building and running the Docker container it is important to create a `.env` file in the project folder, to specify which urls and ports to use.

Paste the following into the `.env` file:
```.env
# ./chat-app/.env
BH_URL=http://localhost # Backend Host URL
BH_PORT=8080 # Backend Host Port
BC_PORT=8080 # Backend Container Port

FH_URL=http://localhost # Frontend Host URL
FH_PORT=3000 # Frontend Host Port
FC_PORT=80 # Frontend Container Port
```

#### Development mode

1. Clone the repository and navigate to the app folder:
    ```bash
    git clone https://github.com/lundbergsimon/chat-app.git
    cd ./chat-app
    ```

2. Run with docker compose:
    ```bash
    docker compose -f docker-compose-dev.yaml up --build
    ```

3. Open your browser and navigate to http://localhost:3000 to see the app runnning in production mode.

#### Production mode

1. Clone the repository and navigate to the app folder:
    ```bash
    git clone https://github.com/lundbergsimon/chat-app.git
    cd ./chat-app
    ```

2. Run with docker compose:
    ```bash
    docker compose -f docker-compose-prod.yaml up --build
    ```

3. Open your browser and navigate to http://localhost:3000 to see the app runnning in production mode.

## Troubleshooting
- Make sure the frontend container port `FC_PORT` is set to 80 when running Docker production mode since nginx uses this port by default to serve the frontend.
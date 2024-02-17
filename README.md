# Project Setup

This project consists of a Node.js application at the root level and a Vue.js application located in the 'views' directory. Below are the steps to set up and run both parts of the project.

## Node.js Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Create a `.env` file in the root directory or copy the following command and add your environment variables:
    ```bash
    cp env.example .env
    ```

## Vue.js Setup

1. Navigate to the 'views' directory:
    ```bash
    cd views
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the 'views' directory or copy the following command and add your environment variables:
    ```bash
    cp env.example .env
    ```

## Development

To run the Vue.js application with hot-reloads for development:

```bash
npm run serve
```

## Production

To compile and minify the Vue.js application for production:

```bash
npm run build
```

## Linting

To lint and fix files in both Node.js and Vue.js parts of the project:

```bash
npm run lint
```

Follow these instructions to set up and run your Node.js and Vue.js applications effectively.
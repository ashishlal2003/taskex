# TaskEx

TaskEx is a web application built with Node.js and Express that allows users to manage tasks. It provides functionality to create, update, and delete tasks, as well as user authentication and authorization features.

## Installation

1. Clone the repository:

```git clone https://github.com/ashishlal2003/taskex.git```


2. Change into the project directory:

```cd taskex```


3. Install the dependencies:


## Dependencies

- Express: Fast and minimalist web framework for Node.js
- Mongoose: MongoDB object modeling tool
- Dotenv: Loads environment variables from a .env file
- EJS: Templating engine for server-side JavaScript
- Bcrypt: Password hashing library
- Body-Parser

## Usage

1. Create a `.env` file in the root directory of the project and add the necessary environment variables:

```PORT=3000```
```MONGODB_URI=your_mongodb_connection_uri```
```SESSION_SECRET=your_session_secret```


Replace `your_mongodb_connection_uri` with your MongoDB connection URI and `your_session_secret` with a secret key for session management.

2. Start the application:

```npm start```

3. Access the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
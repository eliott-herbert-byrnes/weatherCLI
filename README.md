# CLI Todo

A simple command-line todo/task manager built with Node.js, MongoDB, and Mongoose. Manage your tasks directly from your terminal with an intuitive CLI interface.

## Features

- **Add tasks**: Create new todos with a name and description.
- **Read tasks**: List all your current todos.
- **Update tasks**: Edit task details or mark as completed (which deletes the task).
- **Delete tasks**: Remove tasks by their unique code.
- **Persistent storage**: Tasks are stored in MongoDB Atlas.

## Usage

node [index.js](http://_vscodecontentref_/1) <command>

npm install -g .
todo <command>

## Commands

add – Create a new todo.
read – List all todos.
update – Update or complete a todo.
delete – Delete a todo by code.

# Example

todo add
todo read
todo update
todo delete

## Dependencies

- Node.js
- Mongoose
- MongoDB Atlas
- Commander
- Inquirer
- Chalk
- Ora
- nanoid
- dotenv

## License

ISC
/*
Code for Displaying all the todos.
*/

import { connectDB, disconnectDB } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import chalk from "chalk";
import ora from "ora";

export default async function readTask() {
    try {
        // connect to db
        await connectDB()

        // loading UI
        const spinner = ora('Fetching all todos').start()

        // fetching all todos
        const todos = await Todos.find({})

        // completed UI
        spinner.stop()

        // checking for todos
        if (todos.length === 0) {
            console.log(chalk.blueBright('You do not have any tasks yet!'))
        } else {
            todos.forEach(todo => {
                console.log(
                    chalk.cyanBright('Todo Code: ') + todo.code + '\n' +
                    chalk.blueBright('Name: ') + todo.name + '\n' +
                    chalk.yellowBright('Description: ') + todo.detail + '\n'
                )
            })
        }

        //disconnect from db
        await disconnectDB()

    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

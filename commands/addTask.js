/*
Code for Creating a new todo.
*/

import inquirer from "inquirer";
import { connectDB, disconnectDB } from '../db/connectDB.js'
import Todos from '../schema/TodoSchema.js'
import ora from 'ora'
import chalk from 'chalk'


// Ask user for task name and details
async function input() {
    const answers = await inquirer.prompt([
        { name: 'name', message: 'Enter name of the task:', type: 'input' },
        { name: 'detail', message: 'Enter the details of the task:', type: 'input' }
    ])

    return answers
}

// Gather multiple tasks
const askQuestions = async () => {
    const todoArray = []
    let loop = false

    do {
        const userRes = await input()
        todoArray.push(userRes)
        const confirmQ = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }])
        if (confirmQ.confirm) {
            loop = true
        } else {
            loop = false
        }
    } while (loop)

    return todoArray
}

// Complete the task creation procecc
export default async function addTask() {
    try {
        // get array of todo's
        const userResponse = await askQuestions()

        //connect to DB
        await connectDB()

        // spinner UI
        let spinner = ora('Creating the todos...').start()

        //looping all todos in response
        // saving todo's in the db
        for(let i = 0; i < userResponse.length; i++){
            const response = userResponse[i]
            await Todos.create(response)
        }

        // end of process UI
        spinner.stop()
        console.log(
            chalk.greenBright('Created the todos!')
        )

        // disconnect from the db
        await disconnectDB()

    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

/*
Code for Updating a todo.
*/

import { connectDB, disconnectDB } from '../db/connectDB.js'
import { getTaskCode } from './deleteTask.js'
import inquirer from 'inquirer'
import Todos from '../schema/TodoSchema.js'
import ora from 'ora'
import chalk from 'chalk'


// prompt user for updated values

async function askUpdateQ(todo) {
    try {
        const update = await inquirer.prompt([
            { name: 'name', message: 'Update the name?', type: 'input', default: todo.name },
            { name: 'detail', message: 'Update the description?', type: 'input', default: todo.detail },
            { name: 'status', message: 'Update the status?', type: 'list', choices: ['pending', 'completed'], default: todo.status }
        ])

        return update
    } catch (error) {
        console.log('Somethign wen wrong... \n', error)
    }
}

export default async function updateTask() {
    try {
        // get task entered by the user
        const userCode = await getTaskCode()

        // connecting to the db
        await connectDB()

        // loading UI
        const spinner = ora('Finding the todo...').start()

        // finding the todo
        const todo = await Todos.findOne({ code: userCode.code })

        // stopping the spinner
        spinner.stop()

        // checking if the todo exists
        if (!todo) {
            console.log(
                chalk.redBright('Could not find a Todo with the code you provided')
            )
        } else {
            console.log(
                chalk.blueBright('Type the updated properties. Press Enter if you don\'t want to update the data.')
            )

            // get user response
            const update = await askUpdateQ(todo)

            // handling delete or update
            if (update.status === 'completed') {
                // UI
                spinner.text = 'Deleting the todo...'
                spinner.start()

                // deleting the todo
                await Todos.deleteOne({ _id: todo._id })

                // ending UI
                spinner.stop()
                console.log(
                    chalk.greenBright('Deleted the todo.')
                )
            } else {
                //update the todo
                spinner.text = 'Updating the todo'
                spinner.start()
                await Todos.updateOne({ _id: todo._id }, update, { runValidators: true })
                spinner.stop()
                console.log(
                    chalk.greenBright('Updated the todo.')
                )
            }
        }

        // disconnect
        await disconnectDB()

    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

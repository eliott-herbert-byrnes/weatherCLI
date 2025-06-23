/*
Code for Deleting a todo.
*/

import inquirer from 'inquirer';
import { connectDB, disconnectDB } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import chalk from "chalk";
import ora from "ora";
import { connect } from 'mongoose';

// get a specific task

export async function getTaskCode(){
    try {
        // prompt user to enter code
        const answers = await inquirer.prompt([
            {name: 'code', message: 'Enter the code of the todo', type: 'input'},
        ])

        // trimming users response
        answers.code = answers.code.trim()

        return answers
    } catch (error) {
        console.log('Something went wrong...\n', error)
    }
}

// deleting task from db

export default async function deleteTask(){
    try {
        // Getting todo code
        const userCode = await getTaskCode()

        // connecting to the database
        await connectDB()

        // loading ui
        const spinner = ora('Finding and Deleting the todo...').start()

        //deleting the task
        const response = await Todos.deleteOne({code: userCode.code})

        // finalised ui
        spinner.stop()

        // checking delete operation
        if(response.deletedCount === 0){
            console.log(chalk.redBright('Could not find any todo matching the provided name'))
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully'))
        }

        await disconnectDB()

    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

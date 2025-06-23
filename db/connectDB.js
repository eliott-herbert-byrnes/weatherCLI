/*
the code for connecting to the MongoDB database and disconnecting when needed.
*/

// load from env files
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import ora from 'ora'
import chalk from 'chalk'

export async function connectDB(){
    try {
        const spinner = ora('Connecting to the database...').start()
        await mongoose.connect(process.env.MONGO_URI)
        spinner.stop()
        console.log(chalk.greenBright('Successfully connected to the database'))
    } catch (error) {
        console.log(chalk.redBright('Error: '), error)
        process.exit(1)
    }
}

export async function disconnectDB(){
    try {
        await mongoose.disconnect()
        console.log(chalk.greenBright('Disconnected from the database.'))
    } catch (error) {
        console.log(chalk.redBright('Error: '), error)
        process.exit(1)
    }
}

// connectDB()
// disconnectDB()
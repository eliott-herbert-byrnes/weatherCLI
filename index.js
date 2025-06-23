#!/usr/bin/env node

import addTask from './commands/addTask.js'
import deleteTask from './commands/deleteTask.js'
import readTask from './commands/readTask.js'
import updateTask from './commands/updateTask.js'
import { Command } from 'commander'

const program = new Command()

program
.name('todo')
.description('Your terminal task manager.')
.version('1.0.0')

// add
program
.command('add')
.description('create a new todo.')
.action(addTask)

// read
program
.command('read')
.description('read all the todos')
.action(readTask)

// update
program
.command('update')
.description('Updates a todo.')
.action(updateTask)

// delete
program
.command('delete')
.description('Deletes a todo.')
.action(deleteTask)

// Parsing the command-line arguments and executing the corresponding actions
program.parse()
#!/usr/bin/env node
import { writeEntry, readEntries } from '../utils/fileHandler.js';
import { Command } from 'commander'

const program = new Command();

program
    .command('write <note>')
    .option('--location <location>', 'Location of the entry')
    .description('Write a new journal entry')
    .action(async (note, options) => {
        const entry = {
            date: new Date().toISOString().split('T')[0],
            location: options.location || 'Unknown',
            note
        }
        await writeEntry(entry)
        console.log('Entry saved!')
    })

program
    .command('read')
    .option('--date <date>', 'Filter by date YYYY-MM-DD')
    .description('')
    .action(async (options) => {
        const entries = await readEntries()
        const filtered = options.date
        ? entries.filter(e => e.date === options.date)
        : entries
        console.log(filtered)
    })

program.parse(process.argv)
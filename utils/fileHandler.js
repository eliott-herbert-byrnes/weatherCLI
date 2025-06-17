import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, '../data/entries.json')

export async function readEntries() {
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

export async function writeEntry(entry) {
    const entries = await readEntries()
    entries.push(entry)
    await writeFile(filePath, JSON.stringify(entries, null, 2))
}

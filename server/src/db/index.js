import { readFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './src/db')
console.log(DB_PATH)

export const readDBFile =  async (dbName) => {
	return await readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse)
}


export const NODES = readDBFile('data/nodes/2011-01')

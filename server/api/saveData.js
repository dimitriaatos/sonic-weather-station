import jsonfile from 'jsonfile'
import { fetchData } from './fetching.mjs'

const filename = 'dummyData'

const saveData = async () => {
	const data = await fetchData()
	jsonfile.writeFile(`./${filename}.json`, data, console.log)
}

saveData()

import { MongoClient } from "mongodb"
import { config } from "dotenv"
import parsedTokens from "./tokens.js"
config()

// connectToCluster().then(mongoClient => {
// 	mongoClient.close()
// })

// insertSomeData()

// poll()

// touchAr("0VdKc5LOiK", 1)

// browseDataWithToken("0VdKc5LOiK")

async function connectToCluster() {
	const uri = process.env.DB_URI
	try {
		const mongoClient = new MongoClient(uri)
		console.log("Connecting to MongoDB Atlas cluster...")
		await mongoClient.connect()
		console.log("Successfully connected to MongoDB Atlas!")

		return mongoClient
	} catch (error) {
		console.error("Connection to MongoDB Atlas failed!", error)
		process.exit()
	}
}

export async function insertSomeData() {
	// temporary not needed
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		const ar = [false, false, false, false, false, false, false, false, false, false, false, false,]


		for (let i = 0; i < parsedTokens.length; i++) {

			// const status = await collection.insertOne({ token: parsedTokens[i], ar })
			const id = String(i + 1 + 400).padStart(3, '0');
			const status = await collection.insertOne({ token: parsedTokens[i], id, ar })
			console.log(status)
		}

		// console.log(`adding ${book_id} to ${shelf_id}`)
		// return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

/*export async function poll() {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		// console.log(`adding ${book_id} to ${shelf_id}`)
		const data = await collection.find({ isValid: true }).toArray()
		const randomIndex = Math.floor(Math.random() * data.length)
		console.log(data, randomIndex)
		return data
	} finally {
		await mongoClient.close()
	}
}*/


export async function touchAr(token, arID) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		console.log(`Updating arID: ${arID} with token: ${token}`)

		const update = {
			$set: { [`ar.${arID - 1}`]: true }
		}

		const status = (await collection.updateOne({ token }, update)).acknowledged

		console.log(status)

		return status

		// const a = await collection.find().toArray()
		// console.log(a)
		// return a
	} finally {
		await mongoClient.close()
	}
}

// clear ar list
export async function clearAr(token) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		console.log(`Clearing all arIDs with token: ${token}`)

		const update = {
			$set: { ar: [false, false, false, false, false, false, false, false, false, false, false, false,] }
		};

		const status = (await collection.updateOne({ token }, update)).acknowledged

		console.log(status)

		return status

		// const a = await collection.find().toArray()
		// console.log(a)
		// return a
	} finally {
		await mongoClient.close()
	}
}

export async function browseDataWithToken(token) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		console.log(`Querying token: ${token}`)

		const data = await collection.findOne({ token })

		console.log(data)

		return data

		// const a = await collection.find().toArray()
		// console.log(a)
		// return a
	} finally {
		await mongoClient.close()
	}
}

export async function updateForm(token, vote, form) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		console.log(`Updating form with token: ${token}, vote: ${vote}, form:${form}`)

		const data = await collection.updateOne({ token }, { $set: { vote, form, isValidToken: true } })

		console.log(data)

		return data

		// const a = await collection.find().toArray()
		// console.log(a)
		// return a
	} finally {
		await mongoClient.close()
	}
}

export async function getValidToken() {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("專展")
		const collection = db.collection("投票")

		console.log(`getValidToken!`)

		const data = await collection.find({}).toArray()

		const validTokens=data.filter(e=>e.isValidToken)

		// console.log(validTokens)

		return validTokens

		// const a = await collection.find().toArray()
		// console.log(a)
		// return a
	} finally {
		await mongoClient.close()
	}
}
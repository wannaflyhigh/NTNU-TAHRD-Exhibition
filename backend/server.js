import express from 'express';
import cors from 'cors'
import { browseDataWithToken, clearAr, getValidToken, touchAr, updateForm } from './mongodb.js';

const app = express();

app.use(cors())

app.get("/", (req, res) => {
	res.send(`Hi there!`)
})

app.get('/touch-ar', async (req, res) => {
	const { token, arID } = req.query
	const status = await touchAr(token, arID)
	res.json(status)
})

app.get('/clear-ar', async (req, res) => {
	const { token } = req.query
	const status = await clearAr(token)
	res.json(status)
})

app.get('/browse-data-with-token', async (req, res) => {
	const { token } = req.query
	const data = await browseDataWithToken(token)
	res.json(data)
})

app.get('/update-form', async (req, res) => {
	const { token, stringfiedVote, stringfiedForm } = req.query
	const vote = JSON.parse(stringfiedVote)
	const form = JSON.parse(stringfiedForm)
	const data = await updateForm(token, vote, form)
	res.json(data)
})

app.get('/get-valid-token', async (req, res) => {
	const data = await getValidToken()
	res.json(data)
})

app.listen(3000);
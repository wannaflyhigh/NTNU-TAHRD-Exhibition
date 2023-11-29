import express from 'express';
import cors from 'cors'
import { browseDataWithToken, clearAr, touchAr } from './mongodb.js';

const app = express();

app.use(cors())

app.get("/", (req, res) => {
	res.send(`Hi there!<br/>path:/touch-ar params:token,arID to update scanned ar list<br/>path:/clear-ar params:token to clear all scanned ar`)
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

app.listen(3000);
'use strict'
const {json} = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/todo'
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('client'))
app.use(json())


app.get('/api/title', (req, res) => {
	res.json({title: 'simplyTodo'})
})

const List = mongoose.model('list', {
	job: String,
	description: String,
})


app.get('/api/lists', (req, res, err) =>
	List
		.find()
		.then(lists => res.json({ lists }))
		.catch(err)
	)

app.post('/api/lists', (req, res, err)=> {
	const list = req.body
		List
		.create(list)
		.then(list => res.json({ list }))
		.catch(err)
})

	app.post('/api/remove', function (req, res, err) {
		console.log(req.body)
	List
		.remove({_id: req.body.listId})
		.then((data) => res.json({data}))
		.catch(err)
	});

mongoose.Promise = Promise

mongoose.connect(MONGODB_URL, ()=>
	app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
)

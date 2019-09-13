const express = require('express');
const toDoItemsController = require('./controllers/toDoItemsController');
const cookieController = require('./controllers/cookieController');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());

// express.static takes in the root directory, not a file name !
app.use(express.static('./'));
// app.get('/', (req, res, next) => res.sendFile(path.resolve(__dirname, './index.html')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets/')));

app.get('/getItems', cookieController.verify, toDoItemsController.getItems, (req, res) => {
    res.send(res.locals.data);
})

app.post('/add', toDoItemsController.addItem, (req, res) => res.status(200).json(res.locals.items))

app.post('/update', toDoItemsController.updateStatus, (req, res) => res.sendStatus(200))

app.get('/verified', cookieController.set, (req, res) => res.sendStatus(200))

app.use('*', (req, res) => 
    res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)});
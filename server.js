//const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const databaseModule = require('./database/MongoPlandraw');

/* 

// Accepted answer is fine, in case you prefer something shorter, you may use a plugin called cors available for Express.js

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8888'}));
*/

// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const port = 8081;
app.listen(port, () => console.log(`Listenning on port ${port}...`));

app.post('/api/v1/plandraw/diagram/', async (req, res) => {
    var insertedId = await databaseModule.addDiagram(req.body);

    if(insertedId) {
        res.status(201);
        res.send({
            insertedId: insertedId,
            status: 'ok'
        });
    } else {
        res.statusCode = 500;
        res.send({
            status: 'error'
        });
    }
});

app.put('/api/v1/plandraw/diagram/:id', async (req, res) => {
    var id = req.params.id;
    console.log('saving...', req.body);
    var success = await databaseModule.updateDiagram(req.body, id);

    console.log(success);

    if(success) {
        res.status(204);
        res.json();
    } else {
        res.status(500);
        res.json({
            status: 'error'
        });
    }
});

app.get('/api/v1/plandraw/diagram/:id', async (req, res) => {
    var id = req.params.id;

    var diagram = await databaseModule.getDiagramById(id);
    console.log(diagram);

    res.status(200);
    res.json(diagram);
});

app.get('/api/v1/plandraw/diagram', async (req, res) => {
    var ids = await databaseModule.getAllById()
    res.json(ids);
});

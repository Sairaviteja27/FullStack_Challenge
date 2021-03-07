const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(__dirname + '../client/dist/client'));



app.get('/', async (req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
   // const rows ={}
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});
app.post('/search', async (req, res) => {
    console.log("req.body",req.body)
    const rows = await dbPool.query(`SELECT * FROM spaceData WHERE shipType = "${req.body.shipType}"`);
    console.log("rows",rows)
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import {connect} from "./database";
// End file storage config

const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('root', __dirname);

app.set('view engine', 'ejs');

//Connect to the database.

connect((err, db) => {

    if(err){
        console.log("An error connecting to the database", err);
        throw (err);
    }

    app.db = db;
    app.set('db', db);

    app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
    });

});



export default app;
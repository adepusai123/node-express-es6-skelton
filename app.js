import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import environment from './config/constants';
import route from './routes/';
const env = environment.ENVIRONMENT;
const config = require(`./config/config-${env}.json`);
const app = express();

mongoose.Promise = global.Promise;
//mongo db connection need to be set up;
// const dbURI = `mongodb://${config.SERVER.MongoDB.username}:${config.SERVER.MongoDB.password}@${config.SERVER.MongoDB.host}:${config.SERVER.MongoDB.port}/${config.SERVER.MongoDB.database}`;
const dbURI = `mongodb://${config.SERVER.MongoDB.host}:${config.SERVER.MongoDB.port}/${config.SERVER.MongoDB.database}`;
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, {
    useNewUrlParser: true
}, (err)=>{
    console.log(err ? err : 'Mongoose connection established');
});

const swaggerDocument = require('./config/swagger.json');
//middlewares
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '25mb'
}));
app.use(bodyParser.json({
    type: 'application/json'
}));
app.use(bodyParser.text());
// app.use(expressValidator());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', route);

// Error handling 404
app.use((req, res) => {
    res.json({
        status: 404,
        message: 'Page not found!'
    });
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        status: 500,
        message: 'Something went wrong !'
    });
});

app.listen(config.SERVER.WEB.SERVER_PORT, (err) => {
    console.log(err ? err : 'Server listening...!');
});

/* Exception Handling for uncaught Exceptions*/
process.on('uncaughtException', (err)=>{
    console.log('\n Caught exception:'+ err);
    response.status(500).json({error: "500 internal server error"});
});

export default app;
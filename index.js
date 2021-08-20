const express = require("express");
const cors = require('cors');
const projectsRouter = require('./routes/projects-routes');
const db = require('./connections/mongo');
const app = express();
const requestCount = require('./services/global-middleware');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


app.use(cors());

app.options('*', cors());

app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    limit: "20mb",
    extended: true
}));


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//Middleware global que conta o numero de requisições feitos a API.

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(requestCount);

app.use(projectsRouter);

//Middleware das rotas da API




const port = process.env.PORT || 3001;
module.exports = app.listen(port, () =>  console.log(`Listening on port ${port}....`));

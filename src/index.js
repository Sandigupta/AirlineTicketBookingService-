const express = require('express');
const app=express();
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');

const apiRouters = require('./Router/index');
const db = require('./models/index');

const setupAndStartServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.get('bookingservice/api/v1/home', (_, res) => {
        return res.status(200).send({
            message: "Hitting the booking service"
        })
    });

    app.use('bookingservice/api',apiRouters);

    app.use('/home', apiRouters);

    app.listen(PORT, () => {
        console.log(`Server ids running at port:${PORT}`);

        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
    })
}

setupAndStartServer();
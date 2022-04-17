const express = require('express');
const cors = require('cors');

//database
const { dbConnection } = require('../database/config');

class Server {
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        
        //Connect to database
        this.connectDB();

        //methods
        this.middlewares();
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( cors() );
    }

    routes() {
        this.app.use( this.userPath, require('../routes/user.route') );
    }

    listen() {
        this.app.listen(this.port);
    }
}

module.exports = Server;
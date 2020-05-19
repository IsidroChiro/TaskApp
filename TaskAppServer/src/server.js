const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const srv = express();

// Connecting to db
mongoose.connect('mongodb://localhost/taskapp_db')
  .then( db => console.log('DB Connected'))
  .catch( err => console.error(err));

// Importing routes
const indexRouters = require('./routers/index');

// Settings
srv.set('port', process.env.PORT || 4000);

// Middlewares
srv.use(morgan('dev'));
srv.use(express.urlencoded({extended:false}));
srv.use(express.json());
srv.use(cors({origin:'http://localhost:4200'}))

// Routes
srv.use('/', indexRouters);

// Starting the server
srv.listen(srv.get('port'),()=>{
  console.log(`Server on port: ${srv.get('port')}`);
});
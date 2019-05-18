const express = require('express');
var create_server = require('./controllers/db_manager');
var firebase = require('firebase');
var bodyParser = require('body-parser');

const app = express();
create_server();

const server = app.listen(3000, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });
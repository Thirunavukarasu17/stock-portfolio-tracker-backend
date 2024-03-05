const express = require('express');
const path = require('path');
const logger = require('morgan');
const ConnectDB=require("./config/database")

const cors = require('cors')
 


require('dotenv').config();
// Connect to the database

const app = express();
ConnectDB()

app.use(cors())

app.use(logger('dev'));
app.use(express.json());




app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));

const port =process.env.PORT || 3001;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/portfolio-list', require('./routes/api/portfolioList'));
app.use('/api/stocks', require('./routes/api/stocks'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

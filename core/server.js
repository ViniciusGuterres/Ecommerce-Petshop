// Lib Requires
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoDB = require('./db/mongo.js');

require('./routes/index.js')(app);

app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
    console.log('Server running on port 3001');

    // Stating mongo  
    mongoDB();
});
const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Correcting the order of req and res
app.get('/', function (req, res) {
  res.send('welcome everyone');
});

const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/person', personRoutes)
app.use('/menu',menuItemRoutes)
app.listen(3000, () => {
  console.log('Listening on port 3000');  
});

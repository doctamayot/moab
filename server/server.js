const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();
const path = require('path');
const dotenv = require('dotenv');

// app
const app = express();

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION')
  require('dotenv').config({ path: 'server/config/config.env' });
dotenv.config({ path: 'server/config/config.env' });

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// routes middleware
readdirSync('./server/routes').map((r) =>
  app.use('/api', require('./routes/' + r))
);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}
// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

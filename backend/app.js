// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
// const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
// const cors = require('./middlewares/cors');
const cors = require('./middlewares/cors');
const error = require('./middlewares/error');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { PORT = 3000 } = process.env;
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Test middleware');
  next();
});

app.use(requestLogger);
app.use(cors);
app.use(helmet());
// app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { family: 4, useNewUrlParser: true, useUnifiedTopology: true });
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});

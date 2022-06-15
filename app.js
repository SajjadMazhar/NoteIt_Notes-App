const express = require('express');
const path = require('path');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(require("cors")())

// app.get('/', async (req, res, next) => {
//   res.send({ message: 'Awesome it works 🐻' });
// });

// app.use("/static", express.static(path.join(__dirname,"public")))
app.use(express.static("client/build"))
app.use('/api/user', require('./routes/user.route'));
app.use('/api/note', require('./routes/note.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

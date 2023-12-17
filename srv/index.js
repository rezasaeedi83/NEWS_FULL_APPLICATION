const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comment');
const { mongoConnect, initDbConditions } = require('./utils/db');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/comment', commentRouter)

mongoConnect(client => {
  app.listen(3001);
  console.log('listening on 3001');
  initDbConditions();
});

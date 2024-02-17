const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));


// view engine
// app.set('view engine', 'ejs');

// database connection
const dbURI = dbHost+'/'+dbName;
mongoose.connect(dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true })
  .then((result) => {
    app.listen(port)
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log('error when connected to database : ' +err));

// routes
app.get('/user', checkUser, (req, res) => {
  res.json({ user: res.locals.user }); // Include user information in the response
});
// app.get('*', checkUser);
// app.get('/', (req, res) => res.send('the server is run'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
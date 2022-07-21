const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const respTime = require('response-time');
const MongoStore = require('connect-mongo');

const app = express();
// require('./config/passport');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
   extname: '.hbs',
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   helpers: require('./config/hbs'),
   defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use(respTime());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
   secret: process.env.SESSION_KEY,
   resave: true,
   saveUninitialized: true,
   cookie: {
      secure: false,
      maxAge: null
   },
   name: 'sessionUser',
   store: MongoStore.create({
      mongoUrl: process.env.MONGO_SESSION,
      dbName: 'sessionUser',
      autoRemove: 'interval',
      autoRemoveInterval: 59
   })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.warning_msg = req.flash('warning_msg');
   res.locals.info_msg = req.flash('info_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

app.use(require('./routes/index.routes'));

app.use(express.static(path.join(__dirname + '/static')));

app.get('*', (req, res) => {
   res.status(404).render('404');
});

module.exports = app;
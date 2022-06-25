const express = require('express'); // dowload express library
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

//require routes/index.js
const routes = require('./routes');

// require db
const db = require('./config/db/index');
// connect to DB
db.connect();

//convert Post to PUT method
const methodOverride = require('method-override');

//static files
app.use(express.static(path.join(__dirname, 'public')));

//handle form data of method post html
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//handle send data xmlhttp, fetch, axios,...
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'))

app.use(methodOverride('_method'));

// custom middlewares
app.use(SortMiddleware);

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `  <a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
        </a> `;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
routes(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Импорт Express
const express = require('express');
const passport = require('passport');
var session = require('express-session');


// Создание нового экземпляра Express
const app = express();

// swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Импорт роутов
const ratingRouter = require('./routes/rating');
const commentsRouter = require('./routes/comments');
const solutionsRouter = require('./routes/solutions');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const swaggerOptions = require('./swaggerOptions');

// настройка express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.authenticate('session'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json()); // для обработки JSON-запросов
app.use(express.urlencoded({ extended: true })); 
  
// Использование роутов
app.use('/api/rating', ratingRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/solutions', solutionsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Определение порта
const port = 3000;

// слушать на этом порту
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        try {
            console.log(`Server is running on http://localhost:${port}`);
        } catch(error) {
            console.error(error);
        }
    })
}
module.exports = app;
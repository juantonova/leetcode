// Импорт Express
import express from 'express';

// Создание нового экземпляра Express
const app = express();

// swagger
import  swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Импорт роутов
import ratingRouter from './routes/rating';
import commentsRouter from './routes/comments';
import solutionsRouter from './routes/solutions';
import tasksRouter from './routes/tasks';
import usersRouter from './routes/users';
import swaggerOptions from './swaggerOptions';
import ErrorHandler from './middlewares/ErrorHandler';


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

app.use(ErrorHandler)

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

export default app;
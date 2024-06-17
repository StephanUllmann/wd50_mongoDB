import express from 'express';
import 'dotenv/config';
import 'colors';
import dbInit from './dbInitit.js';
import authorRouter from './routes/authors.js';
import blogPostRouter from './routes/blogPosts.js';

const port = process.env.PORT || 8000;
const app = express();

dbInit();

app.use(express.json());
app.use('/authors', authorRouter);
app.use('/blog', blogPostRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`.blue);
});

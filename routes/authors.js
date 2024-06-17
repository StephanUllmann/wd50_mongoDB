import { Router } from 'express';
import { createAuthor, getAuthors, getAuthor, updateAuthor, deleteAuthor } from '../controllers/authors.js';

const authorRouter = Router();

authorRouter.get('/', getAuthors);
authorRouter.get('/:id', getAuthor);
authorRouter.post('/', createAuthor);
authorRouter.put('/:id', updateAuthor);
authorRouter.delete('/:id', deleteAuthor);

export default authorRouter;

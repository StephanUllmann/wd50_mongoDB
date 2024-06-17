import { Router } from 'express';

import { searchBlogPosts, createBlogPost } from '../controllers/blogPosts.js';

const blogPostRouter = Router();

blogPostRouter.get('/', searchBlogPosts);
blogPostRouter.post('/', createBlogPost);

export default blogPostRouter;

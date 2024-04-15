import { BlogController } from '@/controllers/BlogController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const BlogRoute = Router();

BlogRoute.post('/', AuthMiddleware.authAdmin, BlogController.addBlog);
BlogRoute.delete('/:id', AuthMiddleware.authAdmin, BlogController.deleteBlog);
// BlogRoute.get('/:id', BlogController.getBlogById);
BlogRoute.get('/:slug', BlogController.getBlogBySlug);
BlogRoute.get('/', BlogController.getBlogs);
BlogRoute.patch('/:id', AuthMiddleware.authAdmin, BlogController.updateBlog);

export default BlogRoute;

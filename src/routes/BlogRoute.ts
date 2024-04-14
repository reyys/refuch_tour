import { BlogController } from '@/controllers/BlogController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { MulterMiddleware } from '@/middlewares/MulterMiddleware';
import { Router } from 'express';

const BlogRoute = Router();

BlogRoute.post(
    '/',
    AuthMiddleware.authAdmin,
    MulterMiddleware.upload.single('image'),
    BlogController.addBlog
);
BlogRoute.delete('/:id', AuthMiddleware.authAdmin, BlogController.deleteBlog);
// BlogRoute.get('/:id', BlogController.getBlogById);
BlogRoute.get('/:slug', BlogController.getBlogBySlug);
BlogRoute.get('/', BlogController.getBlogs);

export default BlogRoute;

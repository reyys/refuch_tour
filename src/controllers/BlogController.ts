import { Blog } from '@/models/BlogModel';
import { UploadService } from '@/services/UploadService';
import { Request, Response } from 'express';

export class BlogController {
    public static async addBlog(req: Request, res: Response) {
        try {
            await Blog.validate(req.body, {
                pathsToSkip: ['imageUrl', 'slug']
            });
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Please upload an image'
                });
            }

            const exists = await Blog.findOne({ title: req.body.title });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Blog with the same title exists'
                });
            }
            const imageUrl = await UploadService.upload(req.file, {
                blogTitle: req.body.title
            });
            req.body.imageUrl = imageUrl;

            await Blog.create(req.body);
            return res.status(201).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getBlogs(req: Request, res: Response) {
        try {
            const blogs = await Blog.find();
            if (!blogs) {
                return res
                    .status(404)
                    .json({ success: false, message: 'No blogs found' });
            }

            return res
                .status(200)
                .json({ success: true, count: blogs.length, data: blogs });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getBlogById(req: Request, res: Response) {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: 'Blog not found'
                });
            }

            return res.status(200).json({ success: true, data: blog });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async deleteBlog(req: Request, res: Response) {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: 'Blog not found'
                });
            }

            await blog.deleteOne();
            return res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
}

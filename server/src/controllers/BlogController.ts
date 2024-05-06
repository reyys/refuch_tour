import { Blog } from '@/models/BlogModel';
import { ITour } from '@/models/TourModel';
import { Request, Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';

export class BlogController {
    public static async addBlog(req: Request, res: Response) {
        try {
            await Blog.validate(req.body, {
                pathsToSkip: ['slug']
            });

            const exists = await Blog.findOne({ title: req.body.title });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Blog with the same title exists'
                });
            }

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
            const filter: FilterQuery<ITour> = {};
            if (req.query.title) {
                filter.title = { $regex: req.query.title, $options: 'i' };
            }

            const blogs = await Blog.find(filter);

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

    public static async getBlogBySlug(req: Request, res: Response) {
        try {
            const blog = await Blog.findOne({ slug: req.params.slug });
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

    public static async updateBlog(req: Request, res: Response) {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: 'Blog not found'
                });
            }

            await Blog.validate(req.body, {
                pathsToSkip: ['slug']
            });

            await blog.updateOne(req.body);
            return res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({
                    success: false,
                    message: e.message
                });
            } else {
                return res
                    .status(500)
                    .json({ success: false, message: 'Internal server error' });
            }
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

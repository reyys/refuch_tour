import { Testimonial } from '@/models/TestimonialModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class TestimonialController {
    public static async addTestimonial(req: Request, res: Response) {
        try {
            await Testimonial.validate(req.body);

            await Testimonial.create(req.body);
            return res.status(201).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getTestimonials(req: Request, res: Response) {
        try {
            const testimonials = await Testimonial.find();
            if (!testimonials) {
                return res
                    .status(404)
                    .json({ success: false, message: 'No testimonials found' });
            }

            return res.status(200).json({
                success: true,
                count: testimonials.length,
                data: testimonials
            });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getTestimonialById(req: Request, res: Response) {
        try {
            const testimonial = await Testimonial.findById(req.params.id);
            if (!testimonial) {
                return res.status(404).json({
                    success: false,
                    message: 'Testimonial not found'
                });
            }

            return res.status(200).json({ success: true, data: testimonial });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async updateTestimonial(req: Request, res: Response) {
        try {
            const testimonial = await Testimonial.findById(req.params.id);
            if (!testimonial) {
                return res.status(404).json({
                    success: false,
                    message: 'Testimonial not found'
                });
            }

            await Testimonial.validate(req.body);
            await testimonial.updateOne(req.body);
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

    public static async deleteTestimonial(req: Request, res: Response) {
        try {
            const testimonial = await Testimonial.findById(req.params.id);
            if (!testimonial) {
                return res.status(404).json({
                    success: false,
                    message: 'Testimonial not found'
                });
            }

            await testimonial.deleteOne();
            return res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
}

import { Testimonial } from '@/models/TestimonialModel';
import { Request, Response } from 'express';

export class TestimonialController {
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
}

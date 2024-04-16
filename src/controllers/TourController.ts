import { Tour } from '@/models/TourModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class TourController {
    public static async addTour(req: Request, res: Response) {
        try {
            await Tour.validate(req.body, {
                pathsToSkip: ['slug']
            });

            const exists = await Tour.findOne({ name: req.body.name });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Tour with the same name exists'
                });
            }

            await Tour.create(req.body);
            return res.status(201).json({ success: true });
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

    public static async getTours(req: Request, res: Response) {
        try {
            let tours;
            if (req.query.name) {
                tours = await Tour.find({
                    name: { $regex: req.query.name, $options: 'i' }
                });
            } else {
                tours = await Tour.find();
            }

            if (!tours) {
                return res
                    .status(404)
                    .json({ success: false, message: 'No tours found' });
            }

            return res
                .status(200)
                .json({ success: true, count: tours.length, data: tours });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getTourById(req: Request, res: Response) {
        try {
            const tour = await Tour.findById(req.params.id);
            if (!tour) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Tour not found' });
            }

            return res.status(200).json({ success: true, data: tour });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getTourBySlug(req: Request, res: Response) {
        try {
            const tour = await Tour.findOne({ slug: req.params.slug });
            if (!tour) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Tour not found' });
            }

            return res.status(200).json({ success: true, data: tour });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async updateTour(req: Request, res: Response) {
        try {
            const tour = await Tour.findById(req.params.id);
            if (!tour) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Tour not found' });
            }

            await Tour.validate(req.body, {
                pathsToSkip: ['slug']
            });

            await tour.updateOne(req.body);
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

    public static async deleteTour(req: Request, res: Response) {
        try {
            const tour = await Tour.findById(req.params.id);
            if (!tour) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Tour not found' });
            }

            await tour.deleteOne();
            return res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
}

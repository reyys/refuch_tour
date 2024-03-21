import { Tour } from '@/models/TourModel';
import { UploadService } from '@/services/UploadService';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export class TourController {
    public static async addTour(req: Request, res: Response) {
        try {
            await Tour.validate(req.body, { pathsToSkip: ['imageUrl'] });
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Please upload an image'
                });
            }

            const exists = await Tour.findOne({ name: req.body.name });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Tour with the same name exists'
                });
            }
            const imageUrl = await UploadService.upload(req.file, {
                tourName: req.body.name
            });
            req.body.imageUrl = imageUrl;

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
            const tours = await Tour.find();
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

    public static async getTour(req: Request, res: Response) {
        try {
            const tour = await Tour.findById(req.params.tourId);
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

    public static async deleteTour(req: Request, res: Response) {
        try {
            const tour = await Tour.findById(req.params.tourId);
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

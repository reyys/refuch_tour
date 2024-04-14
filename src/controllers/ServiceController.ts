import { Service } from '@/models/ServiceModel';
import { Request, Response } from 'express';

export class ServiceController {
    public static async addService(req: Request, res: Response) {
        try {
            await Service.validate(req.body, {
                pathsToSkip: ['slug']
            });

            const exists = await Service.findOne({ title: req.body.title });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: 'Service with the same title exists'
                });
            }

            await Service.create(req.body);
            return res.status(201).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getServices(req: Request, res: Response) {
        try {
            const services = await Service.find();
            if (!services) {
                return res
                    .status(404)
                    .json({ success: false, message: 'No services found' });
            }

            return res.status(200).json({
                success: true,
                count: services.length,
                data: services
            });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getServiceById(req: Request, res: Response) {
        try {
            const service = await Service.findById(req.params.id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }

            return res.status(200).json({ success: true, data: service });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async getServiceBySlug(req: Request, res: Response) {
        try {
            const service = await Service.findOne({ slug: req.params.slug });
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }

            return res.status(200).json({ success: true, data: service });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    public static async deleteService(req: Request, res: Response) {
        try {
            const service = await Service.findById(req.params.id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found'
                });
            }

            await service.deleteOne();
            return res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
}

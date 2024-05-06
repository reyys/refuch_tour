import { Request, Response } from 'express';

export class HealthController {
    public static async healthCheck(req: Request, res: Response) {
        return res.sendStatus(200);
    }
}

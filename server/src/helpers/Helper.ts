export class Helper {
    public static validateEnvVars() {
        const requiredEnvVars = [
            'EXPRESS_PORT',
            'MONGODB_URI',
            'JWT_SECRET',
            'AWS_REGION',
            'AWS_BUCKET_NAME',
            'AWS_ACCESS_KEY_ID',
            'AWS_SECRET_ACCESS_KEY',
            'MIDTRANS_CLIENT_KEY',
            'MIDTRANS_SERVER_KEY'
        ];

        requiredEnvVars.forEach((envVar) => {
            if (!process.env[envVar]) {
                throw new Error(`Environment variable ${envVar} is missing`);
            }
        });
    }
}

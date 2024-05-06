import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export class UploadService {
    public static async upload(
        file: Express.Multer.File,
        metadata: Record<string, string> = {}
    ) {
        const params: PutObjectCommandInput = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            Metadata: metadata
        };

        try {
            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            const url = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
            return url;
        } catch (e) {
            throw new Error(`Error uploading to S3: ${e}`);
        }
    }
}

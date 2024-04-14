import { Schema, Types, model } from 'mongoose';

export interface IService {
    _id: Types.ObjectId;
    slug: string;
    title: string;
    content: string;
    imageUrl: string;
}

const ServiceSchema = new Schema<IService>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId()
        },
        slug: {
            type: String,
            required: [true, 'Service must have a slug'],
            unique: true
        },
        title: {
            type: String,
            required: [true, 'Service must have a title'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Service must have a content'],
            trim: true
        },
        imageUrl: {
            type: String,
            required: [true, 'Service must have an image'],
            trim: true
        }
    },
    { timestamps: true }
);

ServiceSchema.pre('save', function (next) {
    this.slug = this.title.toLowerCase().split(' ').join('-');
    next();
});

export const Service = model<IService>('Service', ServiceSchema);

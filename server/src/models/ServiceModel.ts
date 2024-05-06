import { Schema, Types, UpdateQuery, model } from 'mongoose';
import slug from 'slug';

export interface IService {
    _id: Types.ObjectId;
    slug: string;
    title: string;
    content: string;
    imageUrl: string;
}

const ServiceSchema = new Schema<IService>(
    {
        slug: {
            type: String,
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
    this.slug = slug(this.title);
    next();
});

ServiceSchema.pre('updateOne', function (next) {
    this.set({
        slug: slug((this.getUpdate() as UpdateQuery<IService>).title)
    });
    next();
});

export const Service = model<IService>('Service', ServiceSchema);

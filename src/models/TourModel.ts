import { Schema, Types, model } from 'mongoose';

export interface ITour {
    _id: Types.ObjectId;
    name: string;
    slug: string;
    description: string;
    price: number;
    location: string;
    duration: number;
    imageUrl: string;
}

const TourSchema = new Schema<ITour>(
    {
        name: {
            type: String,
            required: [true, 'Tour must have a name'],
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'Tour must have a description']
        },
        price: {
            type: Number,
            required: [true, 'Tour must have a price']
        },
        location: {
            type: String,
            required: [true, 'Tour must have a location']
        },
        duration: {
            type: Number,
            required: [true, 'Tour must have a duration']
        },
        imageUrl: {
            type: String,
            required: [true, 'Tour must have an image']
        }
    },
    { timestamps: true }
);

TourSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().split(' ').join('-');
    next();
});

export const Tour = model<ITour>('Tour', TourSchema);

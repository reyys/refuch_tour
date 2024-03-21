import { Schema, model } from 'mongoose';

interface ITour {
    name: string;
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

export const Tour = model<ITour>('Tour', TourSchema);

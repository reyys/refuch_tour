import { Schema, Types, model } from 'mongoose';

export interface ITestimonial {
    _id: Types.ObjectId;
    avatarUrl: string;
    name: string;
    comment: string;
    job: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
    {
        avatarUrl: {
            type: String,
            required: [true, 'Testimonial must have an avatar'],
            trim: true
        },
        name: {
            type: String,
            required: [true, 'Testimonial must have a name'],
            trim: true
        },
        comment: {
            type: String,
            required: [true, 'Testimonial must have a comment'],
            trim: true
        },
        job: {
            type: String,
            required: [true, 'Testimonial must have a job'],
            trim: true
        }
    },
    { timestamps: true }
);

export const Testimonial = model<ITestimonial>(
    'Testimonial',
    TestimonialSchema
);

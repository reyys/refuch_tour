import { Schema, Types, UpdateQuery, model } from 'mongoose';
import slug from 'slug';

export interface IBlog {
    _id: Types.ObjectId;
    slug: string;
    title: string;
    content: string;
    imageUrl: string;
    author: string;
}

const BlogSchema = new Schema<IBlog>(
    {
        slug: {
            type: String,
            unique: true
        },
        title: {
            type: String,
            required: [true, 'Blog must have a title'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Blog must have a content'],
            trim: true
        },
        imageUrl: {
            type: String,
            required: [true, 'Blog must have an image'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Blog must have an author'],
            trim: true
        }
    },
    { timestamps: true }
);

BlogSchema.pre('save', function (next) {
    this.slug = slug(this.title);
    next();
});

BlogSchema.pre('updateOne', function (next) {
    this.set({
        slug: slug((this.getUpdate() as UpdateQuery<IBlog>).title)
    });
    next();
});

export const Blog = model<IBlog>('Blog', BlogSchema);

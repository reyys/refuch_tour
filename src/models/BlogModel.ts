import { Schema, Types, model } from 'mongoose';

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
    this.slug = this.title.toLowerCase().split(' ').join('-');
    next();
});

BlogSchema.pre('updateOne', function (next) {
    this.setUpdate({
        slug: this.get('title').toLowerCase().split(' ').join('-')
    });
    next();
});

export const Blog = model<IBlog>('Blog', BlogSchema);

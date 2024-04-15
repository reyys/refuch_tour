/* eslint-disable @typescript-eslint/ban-types */
import crypto from 'crypto';
import { Model, Schema, Types, model } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

interface IUserMethods {
    validatePassword: (password: string) => boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        firstName: {
            type: String,
            required: [true, 'User must have a first name'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'User must have a last name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'User must have an email'],
            unique: true,
            trim: true
        },
        phone: {
            type: String,
            required: [true, 'User must have a phone number'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'User must have a password'],
            minlength: [6, 'Password must be at least 6 characters long']
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true }
);

UserSchema.methods.validatePassword = function (password: string): boolean {
    const [hash, salt] = this.password.split('.');
    const newHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');

    return hash === newHash;
};

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(this.password, salt, 1000, 64, 'sha512')
        .toString('hex');

    this.password = `${hash}.${salt}`;
    next();
});

export const User = model<IUser, UserModel>('User', UserSchema);

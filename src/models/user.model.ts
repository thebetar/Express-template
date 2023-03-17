import { Schema, model } from 'mongoose';

export interface IUser {
	_id?: string;
	username: string;
	password: string;
	createdAt?: Date;
}

export const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const userModel = model('User', userSchema, 'users');

export default userModel;

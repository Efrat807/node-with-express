import mongoose, { Document, ObjectId, Schema, model } from 'mongoose';

export interface IUser extends Document {
	_id: ObjectId;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	image?:string;
}

const UserSchema: Schema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		image: { type: String },
	},
	{ versionKey: false }
);

export default model<IUser>('User', UserSchema);

// export default Users;

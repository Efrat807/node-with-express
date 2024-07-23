import { Request, RequestHandler, Response } from 'express';
import Users, { IUser } from '../models/userModel';

interface Item {
	id: number;
	name: string;
}

// let items: Item[] = [{ id: 1, name: 'item1' }];

export const createItem: RequestHandler = async (req, res): Promise<void> => {
	try {
		// const { name, level } = req.body;
		const newUser: IUser = new Users(req.body);
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).send(error + ': Server Error');
	}
};

export const getAllItems = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		console.log(Users);
		
		const users1 = await Users.find();
		// console.log(users1, ' usersssssss');
		
		res.json(users1);
	} catch (error) {
		res.status(500).send(error + ': Server Error');
	}
};

export const getItemById = async (
	req: Request,
	res: Response
): Promise<void> => {	
	const user = await Users.findById(req.params.id);
	
	if (user) {
		res.json(user);
	} else {
		res.status(404).send('user not found');
	}
};

export const updateUser: RequestHandler = async (req, res): Promise<void> => {

	const user = (await Users.findById(req.params.id)) as IUser;
	if (!user)  res.status(404).send('user not found');
	else {		
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});		
		res.status(200).json( updatedUser );
	}
};

export const deleteItem = async (
	req: Request,
	res: Response
): Promise<void> => {
	console.log('fgsdfgs', req.params.id);
	
	try {
		const user = (await Users.findByIdAndDelete(req.params.id, {new: true})) as IUser;
		console.log(user, ' - - user - - -');
		
		if (user) res.status(204).send();
		else res.status(404).send('user not found');
	} catch (error) {
		res.status(500).send('server error');
	}
};

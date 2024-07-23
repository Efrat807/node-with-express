import { Router } from 'express';
import {
	createItem,
	getAllItems,
	getItemById,
	updateUser,
	deleteItem,
} from '../controllers/itemController';

const router = Router();

router.post('/user', createItem);
router.get('/user', getAllItems);
router.get('/user/:id', getItemById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteItem);

export default router;

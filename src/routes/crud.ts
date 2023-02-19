import express from 'express';
 const router= express.Router();
//import controllers
// import { getUser, getUserById,addUser,updateUser,deleteUser } from '../controllers/crud';
import {deleteUser, getUserById, getUsers, updateUser} from '../controllers/crud';
//routes
router.get('/',getUsers);
router.get('/:id',getUserById);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;
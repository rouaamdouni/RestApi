import express from 'express';
 const router= express.Router();
//import controllers
// import { getUser, getUserById,addUser,updateUser,deleteUser } from '../controllers/crud';
import {deleteUser, getUserById, getUsers, updateUser} from '../controllers/crud';
//routes
router.get('/getuser',getUsers);
router.get('/getuser/:id',getUserById);
router.put('/updateuser/:id',updateUser);
router.get('/deleteuser/:id',deleteUser);

export default router;
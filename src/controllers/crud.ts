
import { Response, Request } from 'express';
import {IUser,User} from '../models/user'; 
import {ErrorResponse} from '../middlewares/errorResponse';


export const getUsers = async (req:Request,res:Response,next:any) => {

    try {
        const users = await User.find();
        console.log(users);
      if (!users) {
      return next(new ErrorResponse(`Users not found`,404))
        };
        return next(
            res.status(201).json({
                status: 200,
                message: "Success",
                users: users
            }));
    } catch (error:any) {
      return next(new ErrorResponse(error.message,500))
}};


export const getUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
    const user:IUser | null = await User.findOne({id:userId});
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while fetching user',
      });
    }
  };
  
  // UPDATE
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const userId =req.params.id;
      const {firstName, lastName, password, email } = req.body;
  //kaad yretrivi bel doc_id 
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          password,
          email
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while updating user',
      });
    }
  };
  
  // DELETE
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
  
      return res.status(204).json({
        status: 'success',
        data: null,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while deleting user',
      });
    }
  };
 
  
  
  
  
  
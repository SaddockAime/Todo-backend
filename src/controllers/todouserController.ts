import express from 'express'
import bcrypt from 'bcrypt'
import User from '../modules/todouser'
import jwt from "jsonwebtoken"


const secretKey = 'your-secret-key';
//Login
export const login = async (req: express.Request, res: express.Response) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email: email})

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'no user'
            });
        }

        const password_match = await bcrypt.compare(password, user.password)


        if(!password_match){
            return res.status(404).json({
                status: 'fail',
                message: 'Wrong password'
            });
        }


        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

          return res.status(200).json({
            status: 'success',
            data: user
        });
   



    } catch(error: any) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}


//signup
export const signup = async (req: express.Request, res: express.Response) => {
    //console.log("hello my people")
    try {
        const { username, email, password} = req.body;
        if ( !username || !email || !password){
            return res.status(404).json({
                status: 'fail',
                message: 'insert user credentials'
            });
        }

        
        const existingUser = await User.findOne({email: email});

        //console.log(existingUser)

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'user already exists'
            });
        }


        // hash to password
        const hashed_password = await bcrypt.hash(password, 10)
    
        const user = await User.create({
            username,
            email,
            password: hashed_password,
            // isOwner
        });


        return res.status(200).json({
            status: 'success',
            data: user
        });


    } catch(error: any) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}


//view all users
export const viewUsers = async (req: express.Request, res: express.Response) => {

    try {
        const allUsers =await User.find().maxTimeMS(50000)
        
        return res.status(200).json({
            message: "All Users successfully found",
            data: allUsers
        })

    }
    catch(error: any){
        console.log(error)
        return res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}

//get a single user
export const singleUser = async (req: express.Request, res: express.Response) => {

    try {
        const userId = req.params.id; 

        const singleUser = await User.findById(userId);
        if (!singleUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User successfully found",
            data: singleUser
        });


    }
    catch(error: any){
        console.log(error)
        return res.status(500).json({
            message: error.message,
            code: error.code,             
        });
    }
}



//edit user
export const editUser = async (req: express.Request, res: express.Response) => {
    try {

        // edit the user
        const {id} = req.params;
        const {username} = req.body;

        const editUser = await User.findByIdAndUpdate({_id: id}, {username});
        
        if(!editUser){
            return res.status(404).json({
                message: `User with id: ${id} is not found.`
            });
        }

        return res.status(200).json({
            message: "User edited successfully",
            data: editUser
        })

    } 
    catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            code: error.code
        });
    }
}


// delete users
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id; 

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Delete the message
        const deletedUser = await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        });

    } 
    
    catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            code: error.code
        });
    }
}



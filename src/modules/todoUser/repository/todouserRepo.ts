import User from "../../../database/models/todouser";


const createUser = async (body: any) => {
    return await User.create(body);
}

const getAllUsers = async () => {
    return await User.find()
}

const findUserByEmail = async (email: string) => {
    return await User.findOne({email});
}

const findUserById = async (id: string) => {
    return await User.findOne({_id: id});
}

const deleteUserById = async (id: string) => {
    return await User.deleteOne({_id: id});
}

const editUserByUsername = async (id: string, username: string) => {
    return await User.findByIdAndUpdate({_id: id},{username})
}

export {
    createUser,
    findUserByEmail,
    deleteUserById,
    editUserByUsername,
    getAllUsers,
    findUserById
}
import Message from '../../../database/models/todomessage'


const createMessages = async (body: any) => {
    return await Message.create(body);
}

const getAllMessages = async () => {
    return await Message.find()
}

const getMessageById = async (id: string) => {
    return await Message.findOne({_id: id});
}

const editMessageById = async (id: string, name: string, email: string, message: string) => {
    return await Message.findByIdAndUpdate({_id: id},{name, email, message});
}

const deleteMessageById = async (id: string) => {
    return await Message.deleteOne({_id: id});
}

export { createMessages, getAllMessages, getMessageById, deleteMessageById, editMessageById }


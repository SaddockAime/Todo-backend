import express from 'express'
import { createMessages, getAllMessages, getMessageById, deleteMessageById, editMessageById } from '../repository/todomessageRepo'


//messages
export const createMessage = async (req: express.Request, res: express.Response) => {
    //console.log("hello")
    try {
        const {name, email, message} = req.body
            const newMessage = await createMessages({name, email, message})
            return res.status(200).json({
                message: "Message Sent",
                data: newMessage
            })
    } catch(error: any) {
        return res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}


//view all messages
export const viewMessages = async (req: express.Request, res: express.Response) => {
    try {
        const allMessages = await getAllMessages()
        
        if(! allMessages){
            return res.status(404).json({
                message: "messages were not found"
            })
        }
        return res.status(200).json({
            message: "All Messages successfully found",
            data: allMessages
        })
    }
    catch(error: any){
        return res.status(500).json({
            message: error.message,
            code: error.code,             
        })
    }
}


// Update message
export const updateMessage = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const { name, email, message } = req.body;

        const updatedMessage = await editMessageById(userId, name, email, message);

        if (!updatedMessage) {
            return res.status(404).json({
                message: `Message with ${userId}} is not found.`,
            });
        }

        return res.status(200).json({
            message: 'Message edited successfully',
            data: updatedMessage,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};


//delete message
export const deleteMessage = async (req: express.Request, res: express.Response) => {
    try {
        const messageId = req.params.id;
        const existingMessage = await getMessageById(messageId);
        if (!existingMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }
        // Delete the message
        const deletedMessage = await deleteMessageById(messageId);
        return res.status(200).json({
            message: "Message deleted successfully",
            data: deletedMessage
        });
    } 
    catch (error: any) {
        return res.status(500).json({
            message: error.message,
            code: error.code
        });
    }
}
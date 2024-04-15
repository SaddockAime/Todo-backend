import express from 'express';

import {login, signup, viewUsers, singleUser , deleteUser, editUser}  from "../controllers/todouserController";

const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);
router.get("/viewusers", viewUsers);
router.get("/singleUser/:id", singleUser);
router.put("/editUser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);


export default router;
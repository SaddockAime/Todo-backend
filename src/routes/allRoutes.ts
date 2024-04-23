import express from 'express';

import todoUserRoute from './todouserRoutes';
import todomessageRoute from './todomessageRoutes';

const router = express.Router();

router.use("/todousers", todoUserRoute);
router.use("/todomessage", todomessageRoute);

export default router;
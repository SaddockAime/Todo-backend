import express from 'express';

import todoUserRoute from './todouserRoutes';

const router = express.Router();

router.use("/todousers", todoUserRoute);

export default router;
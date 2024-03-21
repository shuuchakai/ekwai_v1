import { Router } from 'express';

import { checkAdminExists } from '../middlewares/administradorExiste.middleware';
import { createAdmin, getAdmin } from '../controllers/admin.controller';

const router = Router();

router.post('/admin', checkAdminExists, createAdmin);

router.get('/admin/:id', getAdmin);

export default router;
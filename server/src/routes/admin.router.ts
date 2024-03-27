import { Router } from 'express';

import { createAdmin, forgotPassword, resetPassword, updatePassword, verifyEmail } from '../controllers/admin.controller';

import { checkAdminExists } from '../middlewares/administradorExiste.middleware';

const router = Router();

router.get('/verify-email/:token', verifyEmail);

router.post('/admin', checkAdminExists, createAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.put('/update-password', updatePassword);

export default router;
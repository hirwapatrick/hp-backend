import { Router } from 'express';
import * as contactController from '../controllers/contactController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', auth, contactController.getAll);
router.get('/:id', auth, contactController.getById);
router.post('/', contactController.create);
router.patch('/:id/read', auth, contactController.markAsRead);
router.delete('/:id', auth, contactController.remove);

export default router;

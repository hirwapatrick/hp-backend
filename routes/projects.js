import { Router } from 'express';
import * as projectController from '../controllers/projectController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', projectController.getAll);
router.get('/featured', projectController.getFeatured);
router.get('/:id', projectController.getById);
router.post('/', auth, upload.single('image'), projectController.create);
router.put('/:id', auth, upload.single('image'), projectController.update);
router.delete('/:id', auth, projectController.remove);

export default router;

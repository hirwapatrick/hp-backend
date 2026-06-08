import { Router } from 'express';
import * as testimonialController from '../controllers/testimonialController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getById);
router.post('/', auth, upload.single('image'), testimonialController.create);
router.put('/:id', auth, upload.single('image'), testimonialController.update);
router.delete('/:id', auth, testimonialController.remove);

export default router;

import { Router } from 'express';
import * as galleryController from '../controllers/galleryController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', galleryController.getAll);
router.get('/:id', galleryController.getById);
router.post('/', auth, upload.single('image'), galleryController.create);
router.put('/:id', auth, upload.single('image'), galleryController.update);
router.delete('/:id', auth, galleryController.remove);

export default router;

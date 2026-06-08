import { Router } from 'express';
import * as postController from '../controllers/postController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', postController.getAll);
router.get('/slug/:slug', postController.getBySlug);
router.get('/:id', postController.getById);
router.post('/', auth, upload.single('coverImage'), postController.create);
router.put('/:id', auth, upload.single('coverImage'), postController.update);
router.delete('/:id', auth, postController.remove);

export default router;

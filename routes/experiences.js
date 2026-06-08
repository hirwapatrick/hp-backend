import { Router } from 'express';
import * as experienceController from '../controllers/experienceController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getById);
router.post('/', auth, experienceController.create);
router.put('/:id', auth, experienceController.update);
router.delete('/:id', auth, experienceController.remove);

export default router;

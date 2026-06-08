import { Router } from 'express';
import * as skillController from '../controllers/skillController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', skillController.getAll);
router.get('/:id', skillController.getById);
router.post('/', auth, skillController.create);
router.put('/:id', auth, skillController.update);
router.delete('/:id', auth, skillController.remove);

export default router;

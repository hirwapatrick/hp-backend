import { Router } from 'express';
import * as siteSettingController from '../controllers/siteSettingController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', siteSettingController.getAll);
router.put('/', auth, siteSettingController.update);

export default router;

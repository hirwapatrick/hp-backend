import { Router } from 'express';
import { login, register, getMe, getUsers, getUser, updateUser, deleteUser } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.get('/me', auth, getMe);
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.post('/register', auth, register);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;

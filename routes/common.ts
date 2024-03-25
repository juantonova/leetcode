import express from 'express';
const router = express.Router();

router.get('/', () => console.log('Hello!'));

export default router;
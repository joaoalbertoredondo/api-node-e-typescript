import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, Mundo!');
});

router.post('/teste', (req, res) => {
  console.log(req.body);

  return res.json(req.body);
});

export { router };
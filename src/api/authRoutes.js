import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const adminUser = {
  email: 'admin@site.com',
  passwordHash: bcrypt.hashSync('123456', 10)
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const isPasswordValid = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign({ email }, 'segredo_do_token', { expiresIn: '2h' });

  res.json({ token });
});

export default router;

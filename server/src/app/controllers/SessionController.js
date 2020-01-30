import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).send({ error: 'Usuário não existe' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(400).send({ error: 'Senha incorreta' });
    }

    const { id, name } = user;
    res.status(200).json({ id, name, token: user.generateToken() });
  }
}

export default new SessionController();

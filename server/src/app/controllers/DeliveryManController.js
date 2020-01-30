import DeliveryMan from '../models/Deliveryman';

class DeliveryManController {
  async index(req, res) {
    const deliveryMans = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email'],
    });

    return res.json(deliveryMans);
  }

  async store(req, res) {
    const { name, email } = req.body;

    const deliveryManExists = await DeliveryMan.findOne({ where: { email } });

    if (deliveryManExists) {
      return res.status(401).send({ error: 'Entregador já existe' });
    }

    const { id } = await DeliveryMan.create({ name, email });
    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan)
      return res.status(400).send({ error: 'Entregador não existe.' });

    if (deliveryMan.email !== email) {
      const emailExists = await DeliveryMan.findOne({ where: { email } });

      if (emailExists)
        return res
          .status(400)
          .send({ error: 'Email já está sendo utilizado.' });
    }

    await deliveryMan.update({
      name,
      email,
    });

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan)
      return res.status(400).send({ error: 'Entregador não encontrado' });

    await deliveryMan.destroy();
    return res.status(200).send();
  }
}

export default new DeliveryManController();

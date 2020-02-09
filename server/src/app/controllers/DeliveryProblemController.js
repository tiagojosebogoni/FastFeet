import Delivery from '../models/Delivery';

import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import CancelDelivery from '../jobs/CancelDelivery';

import Queue from '../../lib/Queue';

class DeliveryController {
  async show(req, res) {
    const idDelivery = req.params.id;

    const deliveryProblem = await DeliveryProblem.findOne({
      where: { id: idDelivery },
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const deliveryProblem = await DeliveryProblem.findAll();

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const idDelivery = req.params.id;
    const { description } = req.body;

    const delivery = await Delivery.findByPk(idDelivery);
    if (!delivery)
      return res.status(400).send({ error: 'Encomenda não encontrada' });

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: idDelivery,
      description,
    });

    return res.json(deliveryProblem);
  }

  // async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;
    const deliveryProblem = await DeliveryProblem.findByPk(id, {
      include: [
        {
          model: Delivery,
          as: 'deliveries',
          include: [
            {
              model: Recipient,
              as: 'recipients',
              attributes: ['name'],
            },
            {
              model: Deliveryman,
              as: 'deliverymans',
              attributes: ['name', 'email'],
            },
          ],
          attributes: ['product'],
        },
      ],
      attributes: ['id', 'delivery_id', 'description'],
    });

    if (!deliveryProblem)
      return res.status(400).send({ error: 'Problema não encontrado' });

    await deliveryProblem.destroy();

    await Queue.add(CancelDelivery.key, {
      deliveryProblem,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryController();

import Delivery from '../models/Delivery';
import DeliveryMan from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewRecipient from '../jobs/NewRecipient';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: Recipient,
          as: 'recipients',
          attributes: ['id', 'name', 'city', 'state'],
        },
        { model: DeliveryMan, as: 'deliverymans', attributes: ['id', 'name'] },
      ],
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      order: [['id', 'ASC']],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { recipient_id, deliveryman_id, product } = req.body;

    const recipientExists = await Recipient.findByPk(recipient_id);
    if (!recipientExists)
      return res.status(400).send({ error: 'Destinatário não encontrado' });
    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);
    if (!deliveryManExists)
      return res.status(400).send({ error: 'Entregador não encontrado' });

    /* const signature = await File.findByPk(signature_id);
    if (!signature)
      return res
        .status(400)
        .send({ error: 'Assinatura do destinatário não encontrado' });
*/
    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    // do enviar email
    await Queue.add(NewRecipient.key, {
      deliveryManExists,
      recipientExists,
    });
    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;

    const { recipient_id, deliveryman_id, signature_id, product } = req.body;

    const recipientExists = await Recipient.findByPk(recipient_id);
    if (!recipientExists)
      return res.status(400).send({ error: 'Destinatário não encontrado' });

    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);
    if (!deliveryManExists)
      return res.status(400).send({ error: 'Entregador não encontrado' });

    const signature = await File.findByPk(signature_id);
    if (!signature)
      return res
        .status(400)
        .send({ error: 'Assinatura do destinatário não encontrado' });

    const delivery = await Delivery.findByPk(id);
    if (!delivery)
      return res.status(400).send({ error: 'Entrega não encontrada' });

    await delivery.update({
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });

    return res.json({
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    if (!delivery)
      return res.status(400).send({ error: 'Entrega não encontrada.' });

    await delivery.destroy();
    return res.status(200).send();
  }
}

export default new DeliveryController();

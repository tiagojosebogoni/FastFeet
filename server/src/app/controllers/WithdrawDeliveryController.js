import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class WithdrawDeliveryController {
  async update(req, res) {
    const { idDeliveryman } = req.params;
    const { idDelivery } = req.params;

    const deliveryExists = await Delivery.findOne({
      where: {
        id: idDelivery,
        deliveryman_id: idDeliveryman,
        canceled_at: null,
        start_date: null,
      },
    });

    if (!deliveryExists)
      return res.status(400).send({ error: 'Encomenda não encontrada' });

    // no máximo 5 retiradas por dia
    const start_date = new Date();
    const countDelivery = await Delivery.findAll({
      where: {
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
      },
    });

    if (countDelivery.length >= 5)
      return res
        .status(400)
        .send({ error: 'É permitido no máximo 5 retirada por dia' });

    const delivery = await Delivery.findByPk(idDelivery);
    await delivery.update({ start_date });

    return res.json(delivery);
  }
}

export default new WithdrawDeliveryController();

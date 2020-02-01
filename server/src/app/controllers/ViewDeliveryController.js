import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class ViewDeliveryController {
  async index(req, res) {
    const deliveryman_id = req.params.id;

    const existsDelivery = await Deliveryman.findByPk(deliveryman_id);
    if (!existsDelivery) {
      return res.status(400).send({ error: 'Entregador não existe.' });
    }

    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id,
        [Op.or]: [
          {
            canceled_at: null,
          },
          {
            end_date: null,
          },
        ],
      },
    });

    return res.json(delivery);
  }

  async finaled(req, res) {
    const deliveryman_id = req.params.id;

    const existsDelivery = await Deliveryman.findByPk(deliveryman_id);
    if (!existsDelivery) {
      return res.status(400).send({ error: 'Entregador não existe.' });
    }

    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: { [Op.ne]: null },
      },
    });

    return res.json(delivery);
  }
}

export default new ViewDeliveryController();

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { id, name } = await Recipient.create(req.body);

    res.json({ id, name });
  }

  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
      ],
    });

    res.send(recipients);
  }
}

export default new RecipientController();

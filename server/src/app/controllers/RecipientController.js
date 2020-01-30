import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { id, name } = await Recipient.create(req.body);

    res.json({ id, name });
  }
}

export default new RecipientController();

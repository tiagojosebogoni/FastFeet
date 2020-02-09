import Mail from '../../lib/Mail';

class NewRecipient {
  get key() {
    return 'NewRecipient';
  }

  async handle({ data }) {
    const { deliveryManExists, recipientExists } = data;

    await Mail.sendMail({
      to: `${deliveryManExists.name} <${deliveryManExists.email}>`,
      subject: 'Novo encomenda cadastrada',
      template: 'newRecipient',
      context: {
        deliveryMan: deliveryManExists.name,
        recipient: recipientExists.name,
      },
    });
  }
}

export default new NewRecipient();

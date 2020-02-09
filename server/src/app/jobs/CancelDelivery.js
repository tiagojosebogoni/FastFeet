import Mail from '../../lib/Mail';

class CancelDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { deliveryProblem } = data;

    await Mail.sendMail({
      to: `${deliveryProblem.deliveries.deliverymans.name} <${deliveryProblem.deliveries.deliverymans.email}>`,
      subject: 'Encomenda cancelada',
      template: 'canceledRecipient',
      context: {
        deliveryMan: deliveryProblem.deliveries.deliverymans.name,
        recipient: deliveryProblem.deliveries.recipients.name,
        product: deliveryProblem.deliveries.product,
        description: deliveryProblem.description,
      },
    });
  }
}

export default new CancelDelivery();

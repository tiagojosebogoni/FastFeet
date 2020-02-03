import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import ViewDeliveryController from './app/controllers/ViewDeliveryController';
import WithdrawDeliveryController from './app/controllers/WithdrawDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();

const upload = multer(multerConfig);

routes.get('/deliveryman/:id/deliveries', ViewDeliveryController.index);
routes.get(
  '/deliveryman/:id/deliveries/:finaled',
  ViewDeliveryController.finaled
);

routes.put(
  '/deliveryman/:idDeliveryman/deliveries/:idDelivery',
  WithdrawDeliveryController.update
);

// rota não terminada e não testada, deve permitir o envio de uma imagae signature
routes.put(
  '/deliveryman/:idDeliveryman/deliveries/:idDelivery/finaled',
  WithdrawDeliveryController.finaledDelivery
);

routes.get('/deliveryProblems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Destinatário
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

routes.post('/files', upload.single('file'), FileController.store);

// CRUD entregadores
routes.post('/deliverymans', DeliveryManController.store);
routes.get('/deliverymans', DeliveryManController.index);
routes.put('/deliverymans/:id', DeliveryManController.update);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

// CRUD entregas
routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries/', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete); // falta mandar email

export default routes;

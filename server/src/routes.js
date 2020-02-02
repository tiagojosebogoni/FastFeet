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

export default routes;

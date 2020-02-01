import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymans', DeliveryManController.store);
routes.get('/deliverymans', DeliveryManController.index);
routes.put('/deliverymans/:id', DeliveryManController.update);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries/', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;

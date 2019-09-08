import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EmployeeController from './app/controllers/EmployeeController';
import SpendingTypesController from './app/controllers/SpendingTypesController';
import ClientController from './app/controllers/ClientController';
import SpendingController from './app/controllers/SpendingController';
import PaymentController from './app/controllers/PaymentController';
import ReportHistoryController from './app/controllers/ReportHistoryController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/spendingtypes', SpendingTypesController.store);
routes.put('/spendingtypes/:id', SpendingTypesController.update);
routes.get('/spendingtypes/', SpendingTypesController.index);
routes.delete('/spendingtypes/:id', SpendingTypesController.delete);

routes.post('/employees', EmployeeController.store);
routes.put('/employees/:id', EmployeeController.update);
routes.get('/employees', EmployeeController.index);
routes.delete('/employees/:id', EmployeeController.delete);

routes.post('/client', ClientController.store);
routes.put('/client/:id', ClientController.update);
routes.get('/client/', ClientController.index);
routes.delete('/client/:id', ClientController.delete);

routes.post('/spending', SpendingController.store);
routes.put('/spending/:id', SpendingController.update);
routes.get('/spending', SpendingController.index);
routes.delete('/spending/:id', SpendingController.delete);

routes.post('/payment', PaymentController.store);
routes.put('/payment/:id', PaymentController.update);
routes.get('/payment', PaymentController.index);
routes.delete('/payment/:id', PaymentController.delete);

routes.post('/reportHistory/first', ReportHistoryController.storeFirst);
routes.post('/reportHistory/', ReportHistoryController.store);
routes.get('/reportHistory/last', ReportHistoryController.indexLast);
routes.get('/reportHistory/', ReportHistoryController.index);
routes.put('/reportHistory/:id', ReportHistoryController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

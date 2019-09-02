import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EmployeesController from './app/controllers/EmployeesController';
import SpendingTypesController from './app/controllers/SpendingTypesController';
import ClientController from './app/controllers/ClientController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/spendingtypes', SpendingTypesController.store);
routes.put('/spendingtypes/:id', SpendingTypesController.update);
routes.get('/spendingtypes/', SpendingTypesController.index);
routes.delete('/spendingtypes/:id', SpendingTypesController.delete);

routes.post('/employees', EmployeesController.store);
routes.put('/employees/:id', EmployeesController.update);
routes.get('/employees', EmployeesController.index);
routes.delete('/employees/:id', EmployeesController.delete);

routes.post('/client', ClientController.store);
routes.put('/client/:id', ClientController.update);
routes.get('/client/', ClientController.index);
routes.delete('/client/:id', ClientController.delete);

export default routes;

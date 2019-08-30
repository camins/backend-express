import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EmployeesController from './app/controllers/EmployeesController';
import SpendingTypesController from './app/controllers/SpendingTypesController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/employees', EmployeesController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/spendingtypes', SpendingTypesController.store);
routes.put('/spendingtypes/:id', SpendingTypesController.update);
routes.get('/spendingtypes/', SpendingTypesController.index);
routes.delete('/spendingtypes/:id', SpendingTypesController.delete);

export default routes;

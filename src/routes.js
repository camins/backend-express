import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EmployeesController from './app/controllers/EmployeesController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/employees', EmployeesController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;

import express from 'express';

import EmailController from './controllers/emailController';
import EquipmentController from './controllers/equipmentController';
import LocalController from './controllers/localController';
import LoginController from './controllers/loginController';
import OsTypeController from './controllers/osTypeController';
import OsStateController from './controllers/osStateController';
import OsController from './controllers/osController';
import SessionController from './controllers/sessionController';
import StatisticsController from './controllers/statisticsController';

const routes = express.Router();

const emailController = new EmailController();
const equipmentController = new EquipmentController();
const localController = new LocalController();
const loginController = new LoginController();
const osTypeController = new OsTypeController();
const osStateController = new OsStateController();
const osController = new OsController();
const sessionController = new SessionController();
const statisticsController = new StatisticsController();

routes.post('/sendmail', emailController.forgotPassword);

routes.get('/users', loginController.index);
routes.get('/equipment', equipmentController.index);
routes.get('/equipment/local', equipmentController.indexId);
routes.get('/local', localController.index);
routes.get('/os', osController.index);
routes.get('/profile', osController.indexId);
routes.get('/profile/registers/:id', osController.registersId);
routes.get('/statistics', statisticsController.show);
routes.get('/osTypes', osTypeController.index);

routes.post('/sessions', sessionController.create);
routes.post('/sessions/newPassword', loginController.newPassword);
routes.post('/users/new', loginController.create);
routes.post('/equipment/new', equipmentController.create);
routes.post('/local/new', localController.create);
routes.post('/profile/newos', osController.create);
routes.post('/os/register/new/', osController.newRegister);
routes.post('/ostype/new', osTypeController.create);
routes.post('/osstate/new', osStateController.create);

export default routes;

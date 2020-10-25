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

routes.get('/admin', loginController.indexAdmin);
routes.get('/users', loginController.indexUsers);
routes.get('/equipment', equipmentController.index);
routes.get('/equipment/local/:localId', equipmentController.indexId);
routes.get('/local', localController.index);
routes.get('/os', osController.index);
routes.get('/all-os', osController.show);
routes.get('/profile', osController.indexId);
routes.get('/profile/registers/:id', osController.registersId);
routes.get('/statistics', statisticsController.show);
routes.get('/osTypes', osTypeController.index);
routes.get('/osStates', osStateController.index);

routes.post('/sessions', sessionController.create);
routes.post('/sessions/newPassword', loginController.newPassword);
routes.post('/users/new', loginController.create);
routes.post('/equipment/new', equipmentController.create);
routes.post('/local/new', localController.create);
routes.post('/profile/newos', osController.create);
routes.post('/os/register/new/', osController.newRegister);
routes.post('/ostype/new', osTypeController.create);
routes.post('/osstate/new', osStateController.create);

routes.delete('/locals/:localId', localController.delete);
routes.delete('/users/:loginName', loginController.delete);
routes.delete('/ostype/:osTypeId', osTypeController.delete);
routes.delete('/osstate/:osStateId', osStateController.delete);
routes.delete('/equipment/:equipmentSerialNumber', equipmentController.delete);

routes.put('/local', localController.update);
routes.put('/equipment', equipmentController.update);
routes.put('/users', loginController.update);
routes.put('/ostype', osTypeController.update);
routes.put('/osstate', osStateController.update);

export default routes;

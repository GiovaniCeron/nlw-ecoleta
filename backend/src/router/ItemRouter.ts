import express from 'express';
const routes = express.Router();

import ItemsController from '../controllers/ItemsController';

const itemsController = new ItemsController();

routes.get('/', itemsController.index);

export default routes;
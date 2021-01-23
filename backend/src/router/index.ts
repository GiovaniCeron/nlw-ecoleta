import express from 'express';

const routes = express.Router();

//Import routes
import ItemRouter from './ItemRouter';
import PointsRouter from './PointsRouter';

//Routes
routes.use('/items', ItemRouter);
routes.use('/points', PointsRouter);

export default routes;
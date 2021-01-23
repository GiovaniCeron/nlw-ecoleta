import express from 'express';
import {celebrate, Joi} from 'celebrate';
import multer from 'multer';
import multerConfig from '../config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

import PointsController from '../controllers/PointsController';

const pointsController = new PointsController();

routes.post(
    '/', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatshapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);

routes.get('/:id', pointsController.show);
routes.get('/', pointsController.index);

export default routes;
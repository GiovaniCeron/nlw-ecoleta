import { Request, Response } from 'express';
import connection from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const parsedItems = String(items).split(',')
            .map(item => Number(item.trim()));

        const points = await connection('points')
            .join('point_items', 'points.idpoint', '=', 'point_items.idpoint')
            .whereIn('point_items.iditem', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializePoints = points.map(point => {
            return {
                ...point,
                image_url: `http://localhost:3333/uploads/${point.image}`,
            }
        });

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const idpoint = request.params.id;

        const point = await connection('points').where('idpoint', idpoint).first();

        if (!point) {
            return response.status(400).json({ message: 'Point não existe' });
        }

        const items = await connection('items')
            .join('point_items', 'items.iditem', '=', 'point_items.iditem')
            .where('point_items.idpoint', idpoint)
            .select('items.title');

        const serializePoint = {
            ...point,
            image_url: `http://localhost:3333/uploads/${point.image}`,
        };

        return response.json({ point : serializePoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatshapp,
            city,
            uf,
            latitude,
            longitude,
            items
        } = request.body;

        const trx = await connection.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatshapp,
            city,
            uf,
            latitude,
            longitude
        };

        const insertIds = await trx('points').insert(point);

        const idpoint = insertIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((iditem: number) => {
                return {
                    iditem,
                    idpoint
                }
            });


        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({
            idpoint,
            ...point
        });

    }

}

export default PointsController;
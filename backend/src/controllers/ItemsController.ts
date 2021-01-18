import {Request, Response} from 'express';
import connection from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await connection('items').select('*');

        return response.json(items);
    }
    
}

export default ItemsController;
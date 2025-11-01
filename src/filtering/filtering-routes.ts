import { Router } from 'express';
import { FilteringController } from './filtering-controller.js';

export class FilteringRouter {
    public readonly router = Router()
    constructor(){
        const controller = new FilteringController();
        this.router.get ('/filter', controller.filter.bind (controller));
        this.router.get ('/findAll', controller.findAll.bind (controller));
        this.router.get ('/:id', controller.findById.bind(controller));
    }

}
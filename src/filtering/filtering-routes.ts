import { Router } from 'express';
import { FilteringController } from './filtering-controller.js';

export const filteringRoutes =Router();
const filteringController = new FilteringController();

filteringRoutes.get ('/filter', filteringController.filter.bind (filteringController));
filteringRoutes.get ('/findAll', filteringController.findAll.bind (filteringController));
filteringRoutes.get ('/:id', filteringController.findById.bind(filteringController));
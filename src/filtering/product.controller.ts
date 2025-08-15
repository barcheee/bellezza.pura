import { Request, Response } from 'express'; //importar otras cosas más
import { create, findAll, findById } from './product.mongo.repository';

export class ProductController {
  async findAll(req: Request, res: Response) {
    try {
      const products = await findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  }

  async findById (req: Request, res: Response) {
    try {
      const product = await findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto' });
    }
  }
  
  async createProduct(req: Request, res: Response) {
    try {
      const newProduct = await create (req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el producto', details: error });
    }
  }
}

function findAll() {
  throw new Error('Function not implemented.');
}

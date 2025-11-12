import { Request, Response } from 'express';
import { Product } from './product-entity.js';
import { ProductMongoRepository } from './product-mongodb-repository.js';

const productRepository = new ProductMongoRepository();
// agregue image  
export class ProductController {
  async create(req: Request, res: Response) {
    const { name, description, price, category, stock , image} = req.body;
    const product = new Product(name, description, price, category, stock ,image);
    const result = await productRepository.create(product);
    res.status(201).json(result);
  }

async getAll(_req: Request, res: Response) {
  try {
    const products = await productRepository.getAll();

    res.status(200).json({
      data: products
    });

  } catch (error: any) {
    console.error('Error fetching products:', error);

    res.status(500).json({
      message: 'Error fetching products',
      error: error.message || error
    });
  }
}

  async getOne(req: Request, res: Response) {
    const product = await productRepository.getOne(req.params.id);
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
  }

  async modify(req: Request, res: Response) {
    const success = await productRepository.update(req.params.id, req.body);
    success ? res.json({ message: 'Producto actualizado' }) : res.status(404).json({ error: 'No se pudo actualizar' });
  }

  async remove(req: Request, res: Response) {
    const success = await productRepository.delete(req.params.id);
    success ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ error: 'No se pudo eliminar'});
}
}
import { Request, Response } from 'express';
import { findById, getAll } from './filtering-mongodb-repository.js';

export class FilteringController {
  async findAll(req: Request, res: Response) {
    try {0
      const products = await getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  }

  async findById(req: Request, res: Response) {
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

  async filter(req: Request, res: Response) {
    try {
      const category = req.query.category as string | undefined;
      const description = req.query.description as string | undefined;

    const filtrados = await getAll (category, description);

if (filtrados.length > 0) {
        res.status(200).json(filtrados);
      } else {
        res.status(404).json({ message: "No se encontraron productos con esos filtros" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al filtrar productos" });
    }
  }
}
import { Request, Response } from 'express';
import { findAll, findById } from './product.mongo.repository.js';

export class ProductController {
  async findAll(req: Request, res: Response) {
    try {
      const products = await findAll();
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
      const { category, description } = req.query;
      const products = await findAll();

      let filtrados = products;

      if (category) {
        filtrados = filtrados.filter((p: { category: string }) =>
          p.category.toLowerCase() === (category as string).toLowerCase()
        );
      }

      if (description) {
        filtrados = filtrados.filter((p: any) =>
  p.description.toLowerCase().includes((description as string).toLowerCase())
);
      }

      if (filtrados.length > 0) {
        res.status(200).json(filtrados);
      } else {
        res.status(404).json({ message: "No se encontraron productos con esos filtros" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al filtrar productos" });
    }
  }
}
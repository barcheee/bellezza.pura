import { Request, Response } from 'express'; //importar otras cosas más

const productService = new ProductService(); //en base al repo de mongo

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(req.params.id);
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
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el producto', details: error });
    }
  }



  async deleteProduct(req: Request, res: Response) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).send(); // 204 No Content para una eliminación exitosa
    } catch (error) {
      res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }
  }
}
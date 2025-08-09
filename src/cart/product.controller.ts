import { Request, Response } from 'express';
import { MongoProductRepository } from './product.mongodb.repository.js';

const productRepository = new MongoProductRepository();

export class ProductController {
    async addToCart(req: Request, res: Response) {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ error: 'Se necesita el id y la cantidad del producto' });
        }
        await productRepository.addToCart(productId, quantity);
        res.status(200).json({ message: 'Producto agregado al carrito' });
    }

    async removeFromCart(req: Request, res: Response) {
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({ error: 'Se necesita la id del producto' });
        }
        await productRepository.removeFromCart(productId, quantity);
        res.status(200).json({ message: 'Producto eliminado del carrito' });
    }

    async getCartProducts(req: Request, res: Response) {
        const cartProducts = await productRepository.getCartProducts();
        res.status(200).json({ data: cartProducts });
    }

    async getCartTotal(req: Request, res: Response) {
        const total = await productRepository.getCartTotal();
        res.status(200).json({ total });
    }

    async checkoutCart(req: Request, res: Response) {
        await productRepository.checkoutCart();
        res.status(200).json({ message: 'Orden de compra realizada' });
    }
}
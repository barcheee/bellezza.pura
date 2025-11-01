import { Router } from "express";
import { CartController } from './cart-controller.js';


export class CartRouter {
    public readonly router = Router();
    constructor(){
        const controller = new CartController();
        this.router.post('/add', controller.addToCart);
        this.router.post('/remove', controller.removeFromCart);
        this.router.get('/products', controller.getCartProducts);
        this.router.get('/total', controller.getCartTotal);
        this.router.post('/confirm', (req, res) => controller.confirmCart(req, res));
    }
}




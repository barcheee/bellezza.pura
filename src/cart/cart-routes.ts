import { RequestHandler, Router } from "express";
import { CartController } from './cart-controller.js';


export class CartRouter {
    public readonly router = Router();
    constructor(){
        const controller = new CartController();

        const add: RequestHandler = (req, res) => { void controller.addToCart(req, res); };
        const remove: RequestHandler = (req, res) => { void controller.removeFromCart(req, res); };
        const products: RequestHandler = (req, res) => { void controller.getCartProducts(req, res); };
        const total: RequestHandler = (req, res) => { void controller.getCartTotal(req, res); };
        const confirm: RequestHandler = (req, res) => { void controller.confirmCart(req, res); };

        this.router.post('/add', add);
        this.router.post('/remove', remove);
        this.router.get('/products', products);
        this.router.get('/total', total);
        this.router.post('/confirm', confirm);
    }
}



import { Request, Response } from 'express';
import { CartMongoRepository } from './cart-mongodb-repository.js';
import { OrderMongoRepository } from '../order/order-mongodb-repository.js';
import { Order } from '../order/order-entity.js';

const cartRepository = new CartMongoRepository();
const orderRepository = new OrderMongoRepository();

export class CartController {

    async addToCart(req: Request, res: Response) {
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                code: 'MISSING_PRODUCT_ID',
                message: 'El ID del producto es requerido'
            });
        }
        if (!Number.isFinite(quantity) || quantity <= 0) {
            return res.status(400).json({
                status: 'error',
                code: 'INVALID_QUANTITY',
                message: 'La cantidad debe ser un numero mayor a 0'
            });
        }
        const existsInDb = await cartRepository.findById(productId);
        if (!existsInDb) {
            return res.status(404).json({
                status: 'error',
                code: 'PRODUCT_NOT_FOUND',
                message: 'El producto no existe en la base de datos'
            });
        }

        const productsInCartBefore = await cartRepository.getCartProducts();
        const productBefore = productsInCartBefore.find(ci => ((ci.product as any)._id || (ci.product as any).id) === productId);
        const currentQty = productBefore ? productBefore.quantity : 0;
        
        try {
            await cartRepository.addToCart(productId, quantity);
        } catch (err: any) {
            if (err.message === 'PRODUCT_NOT_FOUND') {
                return res.status(404).json({
                    status: 'error',
                    code: 'PRODUCT_NOT_FOUND',
                    message: 'El producto no existe en la base de datos'
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Error interno al agregar el producto al carrito'
            });
        }

        const productsInCartAfter = await cartRepository.getCartProducts();
        const productAfter = productsInCartAfter.find(ci => ((ci.product as any)._id || (ci.product as any).id) === productId);

        if (productBefore) {
            const expected = currentQty + quantity;
            const newQty = productAfter ? productAfter.quantity : 0;
            if (newQty !== expected) {
                return res.status(500).json({
                    status: 'error',
                    code: 'ADD_FAILED',
                    message: 'No se pudo actualizar la cantidad del producto en el carrito'
                });
            }
            return res.status(200).json({
                message: 'Cantidad del producto actualizada',
                productId,
                quantity: newQty
            });
        } else {
            if (!productAfter) {
                return res.status(500).json({
                    status: 'error',
                    code: 'ADD_FAILED',
                    message: 'No se pudo agregar el producto al carrito'
                });
            }
            if (productAfter.quantity !== quantity) {
                return res.status(500).json({
                    status: 'error',
                    code: 'ADD_FAILED',
                    message: 'Cantidad del producto en el carrito no coincide con la solicitada'
                });
            }
            return res.status(200).json({
                message: 'Producto agregado al carrito',
                productId,
                quantity: productAfter.quantity
            });
        }
    } 

    async removeFromCart(req: Request, res: Response) {
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                code: 'MISSING_PRODUCT_ID',
                message: 'Se necesita la ID del producto'
            });
        }
        if (quantity !== undefined) {
            if (!Number.isFinite(quantity) || quantity < 0) {
                return res.status(400).json({
                    status: 'error',
                    code: 'INVALID_QUANTITY',
                    message: 'La cantidad debe ser un numero mayor o igual a 1. Omita la cantidad para eliminar completamente'
                });
            }
            if (quantity === 0) {
                return res.status(400).json({
                    status: 'error',
                    code: 'INVALID_QUANTITY_ZERO',
                    message: 'La cantidad no puede ser 0. Para eliminar el producto del carrito, omita el campo quantity'
                });
            }
        }

        const productsInCart = await cartRepository.getCartProducts();
        const productBefore = productsInCart.find(cp => ((cp.product as any)._id || (cp.product as any).id) === productId);
        if (!productBefore) {
            return res.status(404).json({
                status: 'error',
                code: 'PRODUCT_NOT_IN_CART',
                message: 'El producto no esta en el carrito'
            });
        }
        const currentQty = productBefore.quantity;

        try {
            await cartRepository.removeFromCart(productId, quantity);
        } catch (err: any) {
            if (err.message === 'INVALID_QUANTITY') {
                return res.status(400).json({
                    status: 'error',
                    code: 'INVALID_QUANTITY',
                    message: 'Cantidad invalida'
                });
            }
            if (err.message === 'PRODUCT_NOT_IN_CART') {
                return res.status(404).json({
                    status: 'error',
                    code: 'PRODUCT_NOT_IN_CART',
                    message: 'El producto no esta en el carrito'
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Error interno al eliminar el producto del carrito'
            });
        }

        const cartProductsAfter = await cartRepository.getCartProducts();
        const productAfter = cartProductsAfter.find(cp => ((cp.product as any)._id || (cp.product as any).id) === productId);

        if (quantity === undefined) {
            if (productAfter) {
                return res.status(500).json({
                    status: 'error',
                    code: 'REMOVE_FAILED',
                    message: 'No se pudo eliminar el producto del carrito'
                });
            }
            return res.status(200).json({ message: 'Producto eliminado del carrito' });
        } else {
            const expected = currentQty - quantity;
            const newQty = productAfter ? productAfter.quantity : 0;
            if (newQty !== expected) {
                return res.status(500).json({
                    status: 'error',
                    code: 'REMOVE_FAILED',
                    message: 'No se pudo actualizar la cantidad del producto en el carrito'
                });
            }
            return res.status(200).json({
                message: 'Cantidad del producto actualizada',
                productId,
                quantity: newQty
            });
        }
    }

    async getCartProducts(req: Request, res: Response) {
        try {
            const cartProducts = await cartRepository.getCartProducts();
              
            if (cartProducts.length === 0) {
                return res.status(200).json({
                    message: 'El carrito esta vacio',
                    carrito: []
                });
            }

            const formattedCart = cartProducts.map((item: any) => {
                const product = item.product;
                const id = product._id || product.id;
                const name = product.name ;
                const price = product.price ;
                const quantity = item.quantity ;

                return {
                    id,
                    nombre: name,
                    precioUnitario: price,
                    cantidad: quantity,
                    subtotal: price * quantity
                };
            });
            
            const total = formattedCart.reduce((sum, item) => sum + item.subtotal, 0);
            
            res.status(200).json({ carrito: formattedCart ,total });

        } catch (error) {
            console.error('Error al obtener los productos del carrito:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error interno al obtener los productos del carrito'
            });
        }
    }

    async getCartTotal(req: Request, res: Response) {
        const total = await cartRepository.getCartTotal();
        res.status(200).json({ total });
    }

    async confirmCart(req: Request, res: Response) {
        try {
            const cartProducts = await cartRepository.getCartProducts();

            if (cartProducts.length === 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'El carrito esta vacio'
                });
            }

            const total = await cartRepository.getCartTotal();

            const orderItems = cartProducts.map(cp => ({
                product: cp.product,
                quantity: cp.quantity,
                subtotal: cp.product.price * cp.quantity
            }));

            const order = new Order(orderItems, total);
            await orderRepository.create(order);

            await cartRepository.clearCart();

            return res.status(201).json({
                message: 'Pedido confirmado y guardado correctamente',
                pedido: order
            });

        } catch (error) {
            console.error('Error al confirmar el pedido:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Error interno al confirmar el pedido'
            });
        }
    }
}

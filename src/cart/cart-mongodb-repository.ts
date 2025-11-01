import { CartRepository, CartProduct } from "./cart-repository-interface.js";
import { Product } from '../product/product-entity.js';
import { Collection } from 'mongodb';
import { getProductCollection } from '../product/product-entity.js';


export class CartMongoRepository implements CartRepository  {
    private cart: Map<string, number> = new Map();
     private products: Collection<Product>;
    
      constructor() {
        this.products = getProductCollection();
      }

    async findById(id: string): Promise<Product | undefined> {
        const byId = await this.products.findOne({ _id: id } as any);
        return byId ? (byId as Product) : undefined;
    }


    async addToCart(productId: string, quantity: number): Promise<void> {
        const product = await this.findById(productId);
        const current = this.cart.get(productId) || 0;
        this.cart.set(productId, current + quantity);
    }

    async removeFromCart(productId: string, quantity?: number): Promise<void> {
        if (this.cart.has(productId))  {
            

        if (quantity === undefined ) {
            this.cart.delete(productId);
        } 
        else if (quantity > 0) {
            const current = this.cart.get(productId)!;
            if (current <= quantity) {
                this.cart.delete(productId);
            } else {
                this.cart.set(productId, current - quantity);
            }
        }
        else {
            throw new Error('INVALID_QUANTITY');
        }
    } 
    else {
        throw new Error('PRODUCT_NOT_IN_CART');
    }
}

    async getCartProducts(): Promise<CartProduct[]> {
        const cartProducts: CartProduct[] = [];
        for (const [productId, quantity] of this.cart.entries()) {
            const product = await this.findById(productId);
            if (product) {
                cartProducts.push({ product, quantity });
            }
        }
        return cartProducts;
    }

    async getCartTotal(): Promise<number> {
        let total = 0;
        for (const [productId, quantity] of this.cart.entries()) {
            const product = await this.findById(productId);
            if (product) {
                total += (product.price || 0) * quantity;
            }
        }
        return total;
    }

    async clearCart(): Promise<void> {

        this.cart.clear();
    
    }
}
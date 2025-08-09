import { Product } from "./product_entity.js";
import { ProductRepository, CartProduct } from "./product.repository.interface.js";
import ProductModel from "./product.model.js"; 

export class MongoProductRepository implements ProductRepository {
    private cart: Map<string, number> = new Map();

    async findById(id: string): Promise<Product | undefined> {
        const product = await ProductModel.findById(id).lean();
        return product as Product | undefined;
    }

    async addToCart(productId: string, quantity: number): Promise<void> {
        const current = this.cart.get(productId) || 0;
        this.cart.set(productId, current + quantity);
    }

    async removeFromCart(productId: string, quantity?: number): Promise<void> {
        if (!this.cart.has(productId)) return;
        if (quantity === undefined) {
            this.cart.delete(productId);
        } else {
            const current = this.cart.get(productId)!;
            if (current <= quantity) {
                this.cart.delete(productId);
            } else {
                this.cart.set(productId, current - quantity);
            }
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

    async checkoutCart(): Promise<void> {
        // lugar para la logica de la orden 
        console.log("Orden de compra realizada");
        this.cart.clear();
    
    }
}
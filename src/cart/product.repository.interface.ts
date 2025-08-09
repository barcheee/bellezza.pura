import { Product } from "./product_entity.js";

export interface CartProduct {
    product: Product;
    quantity: number;
}

export interface ProductRepository {
    // Buscar producto por id
    findById(id: string): Promise<Product | undefined>;

    // Agregar producto al carrito
    addToCart(productId: string, quantity: number): Promise<void>;

    // Quitar producto del carrito
    removeFromCart(productId: string, quantity?: number): Promise<void>;

    // Ver productos y cantidades en el carrito
    getCartProducts(): Promise<CartProduct[]>;

    // Ver total del carrito
    getCartTotal(): Promise<number>;

    // Proceder a orden de compra (envía un mensaje)
    checkoutCart(): Promise<void>;
}

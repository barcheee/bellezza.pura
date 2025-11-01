import { Product } from '../product/product-entity' ;

export interface CartProduct {
    product: Product;
    quantity: number;
}

export interface CartRepository {
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

    // limpiar el carrito
    clearCart(): Promise<void>;
}

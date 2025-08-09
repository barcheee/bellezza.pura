import { randomUUID } from 'node:crypto';

export class Product {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public stock: number,
        public id: string = randomUUID(),
    ) {}
}



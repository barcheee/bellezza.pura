import crypto from 'node:crypto'

export class Product {
      constructor(
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public stock: number,
        public _id: string = crypto.randomUUID()
      ) {}
}



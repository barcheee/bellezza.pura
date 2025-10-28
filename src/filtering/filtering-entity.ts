export class Product {
    static filter(arg0: (p: { stockTotal: number; }) => boolean) {}
    stockTotal: any;
    stockMinimo: any;
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public price: number,
      public category: string,
      public stock: number,
      public _id: string = crypto.randomUUID()
      ) {}
}
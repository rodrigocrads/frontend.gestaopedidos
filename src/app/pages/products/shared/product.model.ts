import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { Category } from "./category.model";
import { ProductStatus } from "./product-status.enum";

export class Product extends BaseResourceModel {
    constructor (
        public override id?: string,
        public name?: string,
        public category?: Category,
        public value?: number,
        public status?: ProductStatus,
        public description?: string,
    ) {
        super();
    }

    static fromJson(jsonData: any) {
        return Object.assign(new Product(), jsonData);
    }
}
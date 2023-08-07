import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Order extends BaseResourceModel {
    constructor(
        public override id?: string,
        public details?: string,
        public deliveryDate?: string,
        public total?: number,
        public status?: string,
        public client?: string,
    ){
        super();
    }

    static fromJson(jsonData: any) {
        return Object.assign(new Order(), jsonData);
    }
}

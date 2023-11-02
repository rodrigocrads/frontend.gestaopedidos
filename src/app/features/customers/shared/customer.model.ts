import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { Address } from "./address.model";

export class Customer extends BaseResourceModel {
    constructor (
        public override id?: string,
        public name?: string,
        public address?: Address,
        public cellphone?: string,
        public status?: string
    ) {
        super();
    }

    static fromJson(jsonData: any) {
        return Object.assign(new Customer(), jsonData);
    }
}
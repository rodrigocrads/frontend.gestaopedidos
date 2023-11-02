import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Address extends BaseResourceModel {
    constructor (
        public override id?: string,
        public zipcode?: string,
        public address?: string,
        public number?: number,
        public complement?: string,
        public neighborhood?: string,
        public city?: string,
        public state?: string,
    ) {
        super();
    }

    static fromJson(jsonData: any) {
        return Object.assign(new Address(), jsonData);
    }
}
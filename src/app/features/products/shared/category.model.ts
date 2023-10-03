import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Category extends BaseResourceModel {
    constructor (
        public override id?: string,
        public name?: string,
    ) {
        super();
    }

    static fromJson(jsonData: any) {
        return Object.assign(new Category(), jsonData);
    }
}
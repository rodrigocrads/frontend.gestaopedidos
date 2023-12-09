import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { OrderStatus } from "./order-status.enum";
import { Customer } from "../../customers/shared/customer.model";

export class Order extends BaseResourceModel {
    constructor(
        public override id?: string,
        public observations?: string,
        public deliveryDate?: string,
        public total?: number,
        public status?: OrderStatus,
        public customer?: Customer,
        public items?: any[]
    ){
        super();
    }

    static fromJson(jsonData: any) {
        return Object.assign(new Order(), jsonData);
    }

    static getStatusOptions(): { value: OrderStatus, label: string }[] {
        return [
            { value: OrderStatus.AGUARDANDO_CONFIRMACAO, label: 'Aguardando Confirmação'},
            { value: OrderStatus.CONFIRMADO, label: 'Confirmado'},
            { value: OrderStatus.PENDENTE, label: 'Pendente'},
            { value: OrderStatus.CANCELADO, label: 'Cancelado'},
            { value: OrderStatus.CONCLUIDO, label: 'Concluído'},
        ];
    }
}

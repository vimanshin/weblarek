import type { IApi, ICatalogResponse, IOrderRequest, IOrderResponse } from '../types';

export class WebLarekApi {
    constructor(private readonly api: IApi) {}

    getCatalog(): Promise<ICatalogResponse> {
        return this.api.get<ICatalogResponse>('/product/');
    }

    submitOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}

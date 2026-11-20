import type { IApi, ICatalogResponse, IOrderRequest, IOrderResponse } from '../types';

export class WebLarekApi {
    private readonly api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getCatalog(): Promise<ICatalogResponse> {
        return this.api.get<ICatalogResponse>('/product/');
    }

    submitOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}

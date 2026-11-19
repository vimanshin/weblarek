import type { IProduct } from '../../types';

export class Catalog {
    private items: IProduct[] = [];
    private selectedItem: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items.map((item) => ({ ...item }));
    }

    getItems(): IProduct[] {
        return this.items.map((item) => ({ ...item }));
    }

    getItemById(id: string): IProduct | undefined {
        const item = this.items.find((product) => product.id === id);
        return item ? { ...item } : undefined;
    }

    setSelectedItem(item: IProduct): void {
        this.selectedItem = { ...item };
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItem ? { ...this.selectedItem } : null;
    }
}

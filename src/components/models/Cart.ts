import type { IProduct } from '../../types';

export class Cart {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items.map((item) => ({ ...item }));
    }

    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }

    addItem(item: IProduct): void {
        if (item.price === null || this.hasItem(item.id)) {
            return;
        }

        this.items.push({ ...item });
    }

    removeItem(item: IProduct): void {
        const index = this.items.findIndex((product) => product.id === item.id);

        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    clear(): void {
        this.items = [];
    }

    getCount(): number {
        return this.items.length;
    }

    getTotal(): number {
        return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
    }
}

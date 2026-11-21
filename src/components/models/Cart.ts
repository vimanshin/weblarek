import type { IProduct } from '../../types';

export class Cart {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return [...this.items];
    }

    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }

    addItem(item: IProduct): void {
        if (this.hasItem(item.id)) {
            return;
        }

        this.items.push(item);
    }

    removeItem(id: string): void {
        this.items = this.items.filter((item) => item.id !== id);
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

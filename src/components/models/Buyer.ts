import type { IBuyer } from '../../types';

export class Buyer {
    private data: IBuyer = {
        payment: '',
        email: '',
        phone: '',
        address: '',
    };

    saveData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.data.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.data.email = data.email;
        }
        if (data.phone !== undefined) {
            this.data.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.data.address = data.address;
        }
    }

    getData(): IBuyer {
        return { ...this.data };
    }

    clear(): void {
        this.data = {
            payment: '',
            email: '',
            phone: '',
            address: '',
        };
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};
        const { payment, email, phone, address } = this.data;

        if (payment !== 'card' && payment !== 'cash') {
            errors.payment = 'Выберите способ оплаты';
        }
        if (email.trim() === '') {
            errors.email = 'Укажите почту';
        }
        if (phone.trim() === '') {
            errors.phone = 'Укажите телефон';
        }
        if (address.trim() === '') {
            errors.address = 'Укажите адрес доставки';
        }

        return errors;
    }
}

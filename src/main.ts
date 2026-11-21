import './scss/styles.scss';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { Catalog } from './components/models/Catalog';
import { apiProducts } from './utils/data';

const catalog = new Catalog();
const [firstItem, secondItem, noPriceItem, itemOutsideCart] = apiProducts.items;

console.log('[Catalog] Пустой список:', catalog.getItems());
console.log('[Catalog] Поиск в пустом списке:', catalog.getItemById(firstItem.id));
console.log('[Catalog] Выбор до загрузки:', catalog.getSelectedItem());

catalog.setItems(apiProducts.items);
console.log('[Catalog] Список после сохранения:', catalog.getItems());
console.log('[Catalog] Выбор после загрузки:', catalog.getSelectedItem());

catalog.setSelectedItem(firstItem);
console.log('[Catalog] Первый выбор:', catalog.getSelectedItem()?.title);
catalog.setSelectedItem(secondItem);
console.log('[Catalog] Смена выбора:', catalog.getSelectedItem()?.title);

const found = catalog.getItemById(firstItem.id);
console.log('[Catalog] Известный ID:', found?.title);
console.log('[Catalog] Выбор после успешного поиска:', catalog.getSelectedItem()?.title);
console.log('[Catalog] Неизвестный ID:', catalog.getItemById('missing-id'));
console.log('[Catalog] Выбор после неуспешного поиска:', catalog.getSelectedItem()?.title);

console.log('[Catalog] Поиск вернул исходный товар:', found === firstItem);
console.log('[Catalog] В списке тот же товар, что найден по ID:', catalog.getItems()[0] === found);
console.log('[Catalog] Выбран исходный второй товар:', catalog.getSelectedItem() === secondItem);

const outputItems = catalog.getItems();
outputItems.pop();
console.log('[Catalog] Список после удаления из выданного массива:', catalog.getItems());

catalog.setItems([firstItem]);
console.log('[Catalog] Список после замены:', catalog.getItems());
console.log('[Catalog] Выбор после замены списка:', catalog.getSelectedItem()?.title);

catalog.setItems([]);
console.log('[Catalog] Список после очистки:', catalog.getItems());
console.log('[Catalog] Выбор после очистки списка:', catalog.getSelectedItem()?.title);

const cart = new Cart();
const zeroPriceItem = { ...secondItem, price: 0 };

function logCart(label: string): void {
    console.log('[Cart] ' + label, {
        titles: cart.getItems().map((item) => item.title),
        count: cart.getCount(),
        total: cart.getTotal(),
    });
}

logCart('Новая корзина:');
console.log('[Cart] Товар до добавления:', cart.hasItem(firstItem.id));

cart.addItem(firstItem);
logCart('После добавления товара за 750:');
console.log('[Cart] Товар после добавления:', cart.hasItem(firstItem.id));

cart.addItem({ ...firstItem, price: 1 });
logCart('После попытки добавить дубликат:');

cart.addItem(zeroPriceItem);
logCart('После добавления товара за 0:');

cart.addItem(noPriceItem);
logCart('После добавления товара без цены:');
console.log('[Cart] В корзине тот же товар, что найден в каталоге:', cart.getItems()[0] === found);

const cartOutput = cart.getItems();
cartOutput.pop();
logCart('После удаления из выданного массива:');

cart.removeItem(itemOutsideCart.id);
logCart('После удаления по неизвестному ID:');
cart.removeItem(firstItem.id);
logCart('После удаления первого товара по ID:');
console.log('[Cart] Товар после удаления:', cart.hasItem(firstItem.id));

cart.clear();
logCart('После очистки:');

const buyer = new Buyer();
console.log('[Buyer] Начальные данные:', buyer.getData());
console.log('[Buyer] Ошибки пустой модели:', buyer.validate());

const buyerInput = { address: '  Тестовая улица, 7  ' };
buyer.saveData(buyerInput);
buyerInput.address = 'Внешняя правка входных данных';
console.log('[Buyer] Адрес после правки входного объекта:', JSON.stringify(buyer.getData().address));

buyer.saveData({ phone: '+1 202 555 0142' });
console.log('[Buyer] Адрес и телефон после частичного сохранения:', buyer.getData());
console.log('[Buyer] Ошибки при заполненных адресе и телефоне:', buyer.validate());

buyer.saveData({ address: undefined });
console.log('[Buyer] Адрес после явного undefined:', JSON.stringify(buyer.getData().address));

const buyerOutput = buyer.getData();
buyerOutput.address = 'Внешняя правка полученной копии';
console.log('[Buyer] Адрес после правки полученной копии:', JSON.stringify(buyer.getData().address));

buyer.saveData({ payment: 'card', email: 'buyer@example.test' });
console.log('[Buyer] Полные данные с card:', buyer.getData());
console.log('[Buyer] Ошибки при оплате card:', buyer.validate());
console.log('[Buyer] Адрес после валидации:', JSON.stringify(buyer.getData().address));

buyer.saveData({ payment: 'cash' });
console.log('[Buyer] Оплата cash и ошибки:', buyer.getData().payment, buyer.validate());

buyer.saveData({ address: '   ' });
const buyerErrors = buyer.validate();
console.log('[Buyer] Ошибка пробельного адреса:', { ...buyerErrors });
console.log('[Buyer] Пробельный адрес после валидации:', JSON.stringify(buyer.getData().address));
delete buyerErrors.address;
const nextBuyerErrors = buyer.validate();
console.log('[Buyer] Новый объект ошибок после внешней правки:', buyerErrors !== nextBuyerErrors, nextBuyerErrors);

buyer.saveData({ address: '' });
console.log('[Buyer] После явной очистки только адреса:', buyer.getData());

buyer.saveData({ address: 'Тестовая улица, 7' });
buyer.clear();
console.log('[Buyer] После очистки всех полей:', buyer.getData());
console.log('[Buyer] Ошибки после очистки:', buyer.validate());

const webLarekApi = new WebLarekApi(new Api(API_URL));

webLarekApi.getCatalog()
    .then((response) => {
        catalog.setItems(response.items);
        console.log('[API] Товары из модели каталога:', catalog.getItems());
    })
    .catch((error) => {
        console.error('[API] Не удалось загрузить каталог:', error);
    });

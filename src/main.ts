import './scss/styles.scss';
import { Cart } from './components/models/Cart';
import { Catalog } from './components/models/Catalog';
import { apiProducts } from './utils/data';

const catalog = new Catalog();
const [firstItem, secondItem] = apiProducts.items;

console.log('[Catalog] Пустой список:', catalog.getItems());
console.log('[Catalog] Поиск в пустом списке:', catalog.getItemById(firstItem.id));
console.log('[Catalog] Выбор до загрузки:', catalog.getSelectedItem());

catalog.setItems(apiProducts.items);
console.log('[Catalog] Список после сохранения:', catalog.getItems());
console.log('[Catalog] Выбор после загрузки:', catalog.getSelectedItem());

catalog.setSelectedItem(firstItem);
console.log('[Catalog] Первый выбор:', catalog.getSelectedItem()?.title);
const selectedInput = { ...secondItem };
catalog.setSelectedItem(selectedInput);
console.log('[Catalog] Смена выбора:', catalog.getSelectedItem()?.title);

const found = catalog.getItemById(firstItem.id);
console.log('[Catalog] Известный ID:', found?.title);
console.log('[Catalog] Выбор после успешного поиска:', catalog.getSelectedItem()?.title);
console.log('[Catalog] Неизвестный ID:', catalog.getItemById('missing-id'));
console.log('[Catalog] Выбор после неуспешного поиска:', catalog.getSelectedItem()?.title);

if (found) {
    found.title = 'Правка результата поиска';
}
console.log('[Catalog] Название после правки результата поиска:', catalog.getItemById(firstItem.id)?.title);

const inputItems = apiProducts.items.map((item) => ({ ...item }));
catalog.setItems(inputItems);
inputItems[0].title = 'Правка переданного товара';
inputItems.pop();
console.log('[Catalog] Список после правки входных данных:', catalog.getItems());

const outputItems = catalog.getItems();
outputItems[0].title = 'Правка выданного товара';
outputItems.pop();
console.log('[Catalog] Список после правки выданных данных:', catalog.getItems());

selectedInput.title = 'Правка переданного выбора';
console.log('[Catalog] Выбор после правки переданного товара:', catalog.getSelectedItem()?.title);
const selectedOutput = catalog.getSelectedItem();
if (selectedOutput) {
    selectedOutput.title = 'Правка выданного выбора';
}
console.log('[Catalog] Выбор после правки выданного товара:', catalog.getSelectedItem()?.title);

catalog.setItems([firstItem]);
console.log('[Catalog] Список после замены:', catalog.getItems());
console.log('[Catalog] Выбор после замены списка:', catalog.getSelectedItem()?.title);

catalog.setItems([]);
console.log('[Catalog] Список после очистки:', catalog.getItems());
console.log('[Catalog] Выбор после очистки списка:', catalog.getSelectedItem()?.title);

const cart = new Cart();
const cartInput = { ...firstItem };
const zeroPriceItem = { ...secondItem, price: 0 };
const [, , noPriceItem] = apiProducts.items;

function logCart(label: string): void {
    console.log('[Cart] ' + label, {
        titles: cart.getItems().map((item) => item.title),
        count: cart.getCount(),
        total: cart.getTotal(),
    });
}

logCart('Новая корзина:');
console.log('[Cart] Товар до добавления:', cart.hasItem(firstItem.id));

cart.addItem(cartInput);
logCart('После добавления товара за 750:');
console.log('[Cart] Товар после добавления:', cart.hasItem(firstItem.id));

cart.addItem({ ...firstItem, price: 1 });
logCart('После попытки добавить дубликат:');

cart.addItem(zeroPriceItem);
logCart('После добавления товара за 0:');

cart.addItem(noPriceItem);
logCart('После попытки добавить товар с price: null:');

cartInput.title = 'Правка переданного товара';
logCart('После правки переданного товара:');

const cartOutput = cart.getItems();
if (cartOutput[0]) {
    cartOutput[0].title = 'Правка выданного товара';
}
cartOutput.pop();
logCart('После правки выданного товара и массива:');

cart.removeItem(noPriceItem);
logCart('После удаления по неизвестному ID:');
cart.removeItem({ ...firstItem });
logCart('После удаления другим объектом с тем же ID:');
console.log('[Cart] Товар после удаления:', cart.hasItem(firstItem.id));

cart.clear();
logCart('После очистки:');

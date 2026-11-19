import './scss/styles.scss';
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

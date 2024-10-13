import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

// Проверяем, существует ли директория, и создаём её, если нет
const dataDirectory = path.join(__dirname, 'data');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
  console.log('Директория "data" создана.');
} else {
  console.log('Директория "data" уже существует.');
}

// Функция для генерации буквенно-цифрового кода
function generateAlphaNumeric(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Функция для генерации пользователей
function generateUsers() {
  const users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      id: i,
      name: faker.person.fullName(), // Используем 'person' вместо 'name'
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      created_at: faker.date.recent().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    });
  }
  return users;
}

// Генерация 50 рейсов
function generateFlights() {
  const flights = [];
  for (let i = 1; i <= 50; i++) {
    flights.push({
      id: i,
      flight_number: generateAlphaNumeric(6),
      departure_airport: faker.location.city(), // Используем 'location' для городов
      arrival_airport: faker.location.city(),
      departure_time: faker.date.future().toISOString(),
      arrival_time: faker.date.future().toISOString(),
      price: faker.commerce.price({ min: 100, max: 1000 }), // Используем обновленную версию 'price'
    });
  }
  return flights;
}

// Генерация 150 бронирований
function generateBookings(users, flights) {
  const bookings = [];
  for (let i = 1; i <= 150; i++) {
    bookings.push({
      id: i,
      user_id: (faker.helpers.arrayElement(users) as { id: number }).id, // Приведение к типу
      flight_id: (faker.helpers.arrayElement(flights) as { id: number }).id,
      booking_date: faker.date.recent().toISOString(),
      status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled']),
    });
  }
  return bookings;
}

// Генерация Frequent Flyers для 30 пользователей
function generateFrequentFlyers(users) {
  const frequentFlyers: {
    id: number;
    user_id: number; // Приведение к типу
    points: number; // Используем 'number.int' вместо старого метода
    membership_level: 'silver' | 'gold' | 'platinum';
    joined_date: string;
  }[] = [];
  const frequentFlyerUsers = faker.helpers.arrayElements(users, 30); // Выбираем случайных 30 пользователей
  frequentFlyerUsers.forEach((user, index) => {
    frequentFlyers.push({
      id: index + 1,
      user_id: (user as { id: number }).id, // Приведение к типу
      points: faker.number.int({ min: 1000, max: 50000 }), // Используем 'number.int' вместо старого метода
      membership_level: faker.helpers.arrayElement([
        'silver',
        'gold',
        'platinum',
      ]),
      joined_date: faker.date.past().toISOString(),
    });
  });
  return frequentFlyers;
}

// Генерация данных
const users = generateUsers();
const flights = generateFlights();
const bookings = generateBookings(users, flights);
const frequentFlyers = generateFrequentFlyers(users);

// Запись данных в JSON файлы
const filePathUsers = path.join(dataDirectory, 'users.json');
const filePathFlights = path.join(dataDirectory, 'flights.json');
const filePathBookings = path.join(dataDirectory, 'bookings.json');
const filePathFrequentFlyers = path.join(dataDirectory, 'frequent_flyers.json');

fs.writeFileSync(filePathUsers, JSON.stringify(users, null, 2));
fs.writeFileSync(filePathFlights, JSON.stringify(flights, null, 2));
fs.writeFileSync(filePathBookings, JSON.stringify(bookings, null, 2));
fs.writeFileSync(
  filePathFrequentFlyers,
  JSON.stringify(frequentFlyers, null, 2),
);

console.log('Данные успешно записаны в файлы!');

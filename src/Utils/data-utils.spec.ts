import { validateRow } from './data-utils';
import { faker } from '@faker-js/faker';

describe('validateRow', () => {
  let rows: CsvRow[];

  beforeEach(() => {
    rows = [];
  });

  test('should throw an error if the file is empty', () => {
    const row: CsvRow = {};
    expect(() => validateRow(row, rows)).toThrow('The file is empty');
  });

  test('should throw an error if the row is duplicated', () => {
    const row: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INTERNAL',
      description: faker.string.alphanumeric(500),
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    rows.push(row);

    expect(() => validateRow(row, rows)).toThrow(
      `Duplicate row with ID ${row.id}`,
    );
  });

  test('should throw an error if the ID is not an integer', () => {
    const row = {
      id: 'non_integer',
      balance: 100,
      account: 'INTERNAL',
      description: faker.string.alphanumeric(500),
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    expect(() => validateRow(row, rows)).toThrow(
      `The ID ${row.id} is not an integer`,
    );
  });

  test('should throw an error if the balance is not a number', () => {
    const row = {
      id: 1,
      balance: 'non_number',
      account: 'INTERNAL',
      description: faker.string.alphanumeric(500),
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    expect(() => validateRow(row, rows)).toThrow(
      `The balance ${row.balance} is not a number`,
    );
  });

  test('should throw an error if the account is invalid', () => {
    const row: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INVALID',
      description: faker.string.alphanumeric(500),
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    expect(() => validateRow(row, rows)).toThrow(
      `The account ${row.account} is not valid`,
    );
  });

  test('should throw an error if the description is not a string of 500 characters', () => {
    const row: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INTERNAL',
      description: 'Not a string of 500 characters',
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    expect(() => validateRow(row, rows)).toThrow(
      'The description must be a string of 500 characters',
    );
  });

  test('should throw an error if the status is invalid', () => {
    const row: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INTERNAL',
      description: faker.string.alphanumeric(500),
      status: 'INVALID',
      date: new Date().toISOString(),
    };
    expect(() => validateRow(row, rows)).toThrow(
      `The status ${row.status} is not valid`,
    );
  });

  test('should throw an error if the date does not have a UTC date format or is not from the current day', () => {
    const row: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INTERNAL',
      description: faker.string.alphanumeric(500),
      status: 'PENDING',
      date: 'invalid_date',
    };
    expect(() => validateRow(row, rows)).toThrow(
      `The date ${row.date} does not have a UTC date format or is not from the current day`,
    );
  });

  test('should add the row to the processed rows if it is valid', () => {
    const row: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INTERNAL',
      description: faker.string.alphanumeric(500),
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    validateRow(row, rows);
    expect(rows).toContainEqual(row);
  });
});

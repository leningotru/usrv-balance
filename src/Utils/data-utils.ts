export const validateRow = (row: CsvRow, rows: CsvRow[]): void => {
  // Validate that the file is not empty
  if (Object.keys(row).length === 0) {
    throw new Error('The file is empty');
  }

  // Validate duplicates
  if (rows.some((r) => r.id === row.id)) {
    throw new Error(`Duplicate row with ID ${row.id}`);
  }

  // Validate that the ID is of type integer
  if (!Number.isInteger(row.id)) {
    throw new Error(`The ID ${row.id} is not an integer`);
  }

  // Validate that the balance is of type number
  if (typeof row.balance !== 'number') {
    throw new Error(`The balance ${row.balance} is not a number`);
  }

  // Validate that the account is a string and has valid values
  const validAccounts: string[] = ['INTERNAL', 'PEOPLE', 'OPERATIONS'];
  if (typeof row.account !== 'string' || !validAccounts.includes(row.account)) {
    throw new Error(`The account ${row.account} is not valid`);
  }

  // Validate that the description is a string of 500 characters
  if (typeof row.description !== 'string' || row.description.length !== 500) {
    throw new Error('The description must be a string of 500 characters');
  }

  // Validate that the status is a string and contains valid values
  const validStatus: string[] = ['PENDING', 'PROCESSED'];
  if (typeof row.status !== 'string' || !validStatus.includes(row.status)) {
    throw new Error(`The status ${row.status} is not valid`);
  }

  // Validate that the date has a UTC date format and is from the current day
  const currentDate: string = new Date().toISOString().split('T')[0];

  if (
    !row.date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/) ||
    row.date.split('T')[0] !== currentDate
  ) {
    throw new Error(
      `The date ${row.date} does not have a UTC date format or is not from the current day`,
    );
  }

  // Add the current row to the processed rows
  rows.push(row);
};

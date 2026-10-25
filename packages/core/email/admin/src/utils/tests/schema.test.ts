import { testAddressSchema } from '../schema';

describe('testAddressSchema', () => {
  test('accepts a valid address', async () => {
    await expect(testAddressSchema.isValid('user@example.com')).resolves.toBe(true);
  });

  test('accepts a plus-tagged address', async () => {
    await expect(testAddressSchema.isValid('user+tag@example.com')).resolves.toBe(true);
  });

  test('accepts a pasted address with surrounding spaces', async () => {
    await expect(testAddressSchema.isValid('  user@example.com  ')).resolves.toBe(true);
  });

  test('rejects an empty address', async () => {
    await expect(testAddressSchema.isValid('')).resolves.toBe(false);
  });

  test('rejects an invalid address', async () => {
    await expect(testAddressSchema.isValid('not-an-email')).resolves.toBe(false);
  });
});

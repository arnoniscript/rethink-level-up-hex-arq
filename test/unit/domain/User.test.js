const bcrypt = require('bcrypt');
const User = require('../../../src/domain/User');

jest.mock('bcrypt'); // Mock global do bcrypt

describe('User Entity', () => {
  beforeEach(() => {
    bcrypt.compareSync.mockReset();
  });

  test('Deve criar um usuário com propriedades corretas', () => {
    const user = new User('123', 'test@example.com', 'hash123', 'Test User');
    expect(user.id).toBe('123');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  test('isValidPassword() deve retornar true para senha válida', () => {
    bcrypt.compareSync.mockReturnValue(true);
    const user = new User('1', 'test@example.com', 'hash123', 'Test');
    expect(user.isValidPassword('senha_correta')).toBe(true);
    expect(bcrypt.compareSync).toHaveBeenCalledWith('senha_correta', 'hash123');
  });

  test('isValidPassword() deve retornar false para senha inválida', () => {
    bcrypt.compareSync.mockReturnValue(false);
    const user = new User('1', 'test@example.com', 'hash123', 'Test');
    expect(user.isValidPassword('senha_errada')).toBe(false);
  });
});
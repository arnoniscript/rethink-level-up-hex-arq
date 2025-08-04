const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthUseCases = require('../../../src/application/AuthUseCases');
const User = require('../../../src/domain/User');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../src/domain/User');

describe('AuthUseCases', () => {
  let mockRepo;
  let authUseCases;

  beforeEach(() => {
  mockRepo = {
    findByEmail: jest.fn(),
    save: jest.fn().mockImplementation(user => {
      return Promise.resolve({
        ...user,
        id: user.id || Date.now().toString()
      });
    })
  };
  authUseCases = new AuthUseCases(mockRepo, 'secret_key');
});

  // ----- Register Tests -----
  test('Deve registrar um novo usuário', async () => {
  mockRepo.findByEmail.mockResolvedValue(null);
  mockRepo.save.mockImplementation(user => Promise.resolve(user));
  bcrypt.hashSync.mockReturnValue('hashed_password');

  await authUseCases.register('new@example.com', '123456', 'New User');
  
  expect(mockRepo.save).toHaveBeenCalled();
  
  expect(User).toHaveBeenCalledWith(
    expect.any(String),
    'new@example.com',
    'hashed_password',
    'New User'
  );
});

  test('Deve falhar ao registrar email existente', async () => {
    mockRepo.findByEmail.mockResolvedValue(new User('1', 'exists@example.com', 'hash', 'Exist'));
    
    await expect(authUseCases.register('exists@example.com', '123', 'Exist'))
      .rejects.toThrow('User already exists');
  });

  // ----- Login Tests -----
  test('Deve fazer login com credenciais válidas', async () => {
    const mockUser = {
      id: '1',
      isValidPassword: jest.fn().mockReturnValue(true)
    };
    mockRepo.findByEmail.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue('fake_token');

    const token = await authUseCases.login('valid@example.com', 'correct_pass');
    
    expect(token).toBe('fake_token');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: '1' }, 'secret_key');
  });

  test('Deve falhar login com senha inválida', async () => {
    const mockUser = {
      id: '1',
      isValidPassword: jest.fn().mockReturnValue(false)
    };
    mockRepo.findByEmail.mockResolvedValue(mockUser);
    
    await expect(authUseCases.login('valid@example.com', 'wrong_pass'))
      .rejects.toThrow('Invalid credentials');
  });

  test('Deve falhar login com usuário inexistente', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    
    await expect(authUseCases.login('nonexistent@example.com', 'any_pass'))
      .rejects.toThrow('Invalid credentials');
  });
});
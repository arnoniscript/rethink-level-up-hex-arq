module.exports = {
  hashSync: jest.fn().mockImplementation((pass) => `hashed_${pass}`),
  compareSync: jest.fn().mockReturnValue(true)
};
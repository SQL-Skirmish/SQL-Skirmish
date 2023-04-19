// __tests__/db.test.js

const pgp = require('pg-promise');
const dotenv = require('dotenv');

// Mock pg-promise and dotenv modules
jest.mock('pg-promise');
jest.mock('dotenv');

// Import the actual database file
const db = require('../db');

describe('Database Connection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should connect to ElephantSQL successfully', async () => {
    // Mock the database connection
    const mockConnection = {
      connect: jest.fn().mockResolvedValue(),
    };
    pgp.mockImplementation(() => mockConnection);

    // Call the connect function
    await db.connect();

    // Check if the connection was successful
    expect(mockConnection.connect).toHaveBeenCalled();
  });

  test('should catch error when connecting to ElephantSQL', async () => {
    // Mock the database connection error
    const mockError = new Error('Error connecting to database');
    const mockConnection = {
      connect: jest.fn().mockRejectedValue(mockError),
    };
    pgp.mockImplementation(() => mockConnection);

    // Call the connect function and catch the error
    try {
      await db.connect();
    } catch (error) {
      expect(error).toEqual(mockError);
    }

    // Check if the connect function was called and threw an error
    expect(mockConnection.connect).toHaveBeenCalled();
    expect(mockConnection.connect).toThrowError(mockError);
  });
});

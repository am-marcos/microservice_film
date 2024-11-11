import { describe, it, expect, vi, Mock } from 'vitest';
import mongoose from 'mongoose';
import { connectDB } from '../src/configDB/configDB';
import dotenv from 'dotenv';

dotenv.config(); 

vi.mock('mongoose', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' ? actual : {}),
    default: {
      ...(actual as any).default,
      connect: vi.fn(),
    },
  };
});

describe('connectDB', () => {
  it('should connect to MongoDB successfully', async () => {
    const mockConnect = mongoose.connect as Mock;
    mockConnect.mockResolvedValueOnce(null);

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await connectDB();

    expect(mockConnect).toHaveBeenCalledWith(process.env.DB_URI, {
      tls: true,
      tlsInsecure: true,
    });
    expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB connected');

    consoleLogSpy.mockRestore();
  });

  it('should handle error when connecting to MongoDB', async () => {
    const mockConnect = mongoose.connect as Mock;
    const mockError = new Error('Connection error');
    mockConnect.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const processExitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });

    await expect(connectDB()).rejects.toThrow('process.exit called');

    expect(mockConnect).toHaveBeenCalledWith(process.env.DB_URI, {
      tls: true,
      tlsInsecure: true,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error connecting to MongoDB', mockError);
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
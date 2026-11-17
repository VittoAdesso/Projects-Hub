import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';

// Ensure reliable in-memory localStorage across Node 22+ and JSDOM
const createMemoryStorage = (): Storage => {
  let store: Record<string, string> = {};
  return {
    get length() {
      return Object.keys(store).length;
    },
    clear() {
      store = {};
    },
    getItem(key: string) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key]! : null;
    },
    key(index: number) {
      return Object.keys(store)[index] ?? null;
    },
    removeItem(key: string) {
      delete store[key];
    },
    setItem(key: string, value: string) {
      store[key] = String(value);
    },
  };
};

try {
  if (typeof window !== 'undefined') {
    const storage = createMemoryStorage();
    Object.defineProperty(window, 'localStorage', {
      value: storage,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'localStorage', {
      value: storage,
      writable: true,
      configurable: true,
    });
  }
} catch {
  // Ignore if already configured
}

export function resolveLegacyFile(filename: string): string {
  const directPath = path.resolve(process.cwd(), 'legacy', filename);
  if (fs.existsSync(directPath)) {
    return directPath;
  }
  const listoPath = path.resolve(process.cwd(), 'legacy', 'listo', filename);
  if (fs.existsSync(listoPath)) {
    return listoPath;
  }
  return directPath;
}

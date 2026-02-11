const memoryStorage = new Map<string, string>();

const AsyncStorage = {
  async getItem(key: string): Promise<string | null> {
    return memoryStorage.has(key) ? memoryStorage.get(key) ?? null : null;
  },

  async setItem(key: string, value: string): Promise<void> {
    memoryStorage.set(key, value);
  },

  async removeItem(key: string): Promise<void> {
    memoryStorage.delete(key);
  },
};

export default AsyncStorage;

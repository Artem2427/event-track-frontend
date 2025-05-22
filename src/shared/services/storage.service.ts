/* eslint-disable */
class StorageService {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const data: unknown = localStorage.getItem(key);

    if (!data) return null;

    let obj: T | null;
    try {
      obj = JSON.parse(data.toString()) as T;
    } catch (error) {
      obj = null;
    }

    return obj;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export const storageService = new StorageService();

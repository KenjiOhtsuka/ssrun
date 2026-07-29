export class Context {
  private values = new Map<string, unknown>();

  constructor(base?: Context) {
    if (base) {
      for (const [key, value] of base.entries()) {
        this.values.set(key, value);
      }
    }
  }

  set(key: string, value: unknown) {
    this.values.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.values.get(key) as T;
  }

  entries() {
    return this.values.entries()
  }
}


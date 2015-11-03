/**
 * 操作localStorage
 */
class Storage {
  constructor(storage) {
    this.storage = storage;
  }
  getItem(value) {
    try {
      return JSON.parse(this.storage.getItem(value) || '{}');
    } catch (e) {
      return this.storage.getItem(value);
    }
  }
  setItem(key, value) {
    let val = value;
    if (typeof value !== 'string') {
      val = JSON.stringify(value);
    }
    return this.storage.setItem(key, val);
  }
  removeItem(key) {
    return this.storage.removeItem(key);
  }
}

const localStorage = new Storage(window.localStorage);

export default localStorage;

import { openDb, deleteDb } from 'idb';

export const dbPromise = openDb('cocktails-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('cocktails');
  upgradeDB.createObjectStore('top10cocktails');
});

export const idbCocktails = {
  async get(key) {
    const db = await dbPromise;
    return db.transaction('cocktails').objectStore('cocktails').get(key);
  },
  async getAll() {
    const db = await dbPromise;
    return db.transaction('cocktails').objectStore('cocktails').getAll();
  },
  async getTop10All() {
    const db = await dbPromise;
    return db.transaction('top10cocktails').objectStore('top10cocktails').getAll()
  },
  async set(key, val) {
    const db = await dbPromise;
    const tx = db.transaction('cocktails', 'readwrite');
    tx.objectStore('cocktails').put(val, key);
    return tx.complete;
  },
  async setTop10(key, val) {
    const db = await dbPromise;
    const tx = db.transaction('top10cocktails', 'readwrite');
    tx.objectStore('top10cocktails').put(val, key);
    return tx.complete;
  },
  async keys() {
    const db = await dbPromise;
    return db.transaction('cocktails').objectStore('cocktails').getAllKeys('id');
  },
};

import idb from "idb";

const dbPromise = idb.open("DB", 1, upgradeDB => {
  upgradeDB.createObjectStore("users");
  upgradeDB.createObjectStore("items");
  upgradeDB.createObjectStore("orders");
});

const db = {
  get(key, store) {
    return dbPromise.then(db =>
      db
        .transaction(store)
        .objectStore(store)
        .get(key)
    );
  },
  getAll(store) {
    return dbPromise.then(db =>
      db
        .transaction(store)
        .objectStore(store)
        .getAll()
    );
  },
  set(key, val, store) {
    return dbPromise.then(db => {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).put(val, key);
      return tx.complete;
    });
  },
  delete(key, store) {
    return dbPromise.then(db => {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).delete(key);
      return tx.complete;
    });
  },
  clear(store) {
    return dbPromise.then(db => {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).clear();
      return tx.complete;
    });
  },
  keys(store) {
    return dbPromise.then(db => {
      const tx = db.transaction(store);
      const keys = [];
      const storeFallback = tx.objectStore(store);

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (storeFallback.iterateKeyCursor || storeFallback.iterateCursor).call(
        storeFallback,
        cursor => {
          if (!cursor) return;
          keys.push(cursor.key);
          cursor.continue();
        }
      );

      return tx.complete.then(() => keys);
    });
  }
};

export default db;

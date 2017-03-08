/* eslint-disable */
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const isNil = v => v === null || v === undefined;

class MemoryStore {
    constructor() {
        this.data = {};
    }
    get(id) {
        const data = this.data[id];
        return Promise.resolve(data ? JSON.parse(data) : null);
    }
    set(id, data) {
        this.data[id] = JSON.stringify(data);
        return Promise.resolve();
    }
    del(id) {
        delete this.data[id];
        return Promise.resolve();
    }
}

class LocalStore {
    get(id) {
        return new Promise((resolve) => {
            resolve(JSON.parse(localStorage.getItem(id)) || null);
        });
    }
    set(id, data) {
        localStorage.setItem(id, JSON.stringify(data))
        return Promise.resolve();
    }
    del(id) {
        localStorage.removeItem(id);
        return Promise.resolve();
    }
}

class RadisStore {
    constructor(client) {
        this.client = client;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            this.client.get(id, (err, data) => {
                if (err) return reject(err);
                resolve(JSON.parse(data));
            });
        });
    }
    set(id, data) {
        return new Promise((resolve, reject) => {
            this.client.setex(id, config ? config.cacheTime : 30 * 60, JSON.stringify(data), err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
    del(id) {
        return new Promise((resolve, reject) => {
            this.client.del(id, err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

const requests = {};

class Cache {
    /*
    options: {
      expires: 100, // ms
      sync: -1: 直接请求 0: 取缓存 1: 每次更新 2: 过期更新
      force: true,
    }
     */
    constructor(id, fetch) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$expires = _ref.expires;

        let expires = _ref$expires === undefined ? 5 * 60 * 1000 : _ref$expires;
        var _ref$sync = _ref.sync;
        let sync = _ref$sync === undefined ? 0 : _ref$sync;
        var _ref$force = _ref.force;
        let force = _ref$force === undefined ? false : _ref$force;

        this.id = id;
        this.fetch = oid => {
            const promise = requests[oid] = requests[oid] || fetch(oid);
            promise.then(() => {
                delete requests[oid];
            }, () => {
                delete requests[oid];
            });
            return promise;
        };
        this.deletedAt = 0;
        Object.assign(this, { expires, sync, force });
    }
}

class DataCache {
    constructor() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$store = _ref2.store;

        let store = _ref2$store === undefined ? new MemoryStore() : _ref2$store;

        this.store = store;
        this.caches = {};
        this.promise = Promise.resolve();
    }
    add(id, fetch, options) {
        if (id instanceof Cache) {
            // this.set(id, new Cache(id, fetch, options), options.expires)
            this.caches[id.id] = id;
        } else {
            if (this.caches[id]) return;
            if (isNil(fetch)) throw new Error('fetch 参数不能为空');
            this.caches[id] = new Cache(id, fetch, options);
        }
    }

    get(id) {
        var _this = this,
            _arguments = arguments;

        return _asyncToGenerator(function* () {
            var _ref3 = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};

            let sync = _ref3.sync,
                force = _ref3.force;

            const store = _this.store;
            const cache = _this.caches[id];
            // const cache = await store.get(id)
            if (!cache) return null;
            sync = isNil(sync) ? cache.sync : sync;
            force = isNil(force) ? cache.force : force;
            let data = null;
            let newData;
            let storeData;
            switch (sync) {
                case -1:
                    // 直接请求
                    data = yield cache.fetch(id);
                    _this.set(id, data);
                    return data;
                case 0:
                    // 取缓存 过期后返回 null
                    storeData = yield store.get(id);
                    if (storeData && storeData.expired > Date.now()) {
                        data = storeData.raw;
                    }
                    if (data) return data;
                    if (force) {
                        data = yield cache.fetch(id);
                        yield _this.set(id, data);
                    }
                    return data;
                case 1:
                    // 取缓存 每次更新
                    storeData = yield store.get(id);
                    if (storeData) {
                        data = storeData.raw;
                    }
                    newData = cache.fetch(id);
                    if (!data && force) {
                        data = yield newData;
                        yield _this.set(id, data);
                    } else {
                        newData.then(function (nd) {
                            return _this.set(id, nd);
                        });
                    }
                    return data;
                case 2:
                    // 取缓存 过期更新
                    storeData = yield store.get(id);
                    if (storeData) {
                        data = storeData.raw;
                        if (storeData.expired <= Date.now()) {
                            newData = cache.fetch(id);
                        }
                    }
                    if (!data && force) {
                        data = yield newData || cache.fetch(id);
                        yield _this.set(id, data);
                    } else if (newData) {
                        newData.then(function (nd) {
                            return _this.set(id, nd);
                        });
                    }
                    return data;
                default:
                    return null;
            }
        })();
    }

    set(id, data) {
        var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        let expires = _ref4.expires;

        const cache = this.caches[id];
        expires = isNil(expires) ? cache.expires : expires;
        this.promise = this.promise.then(() => this.store.set(id, {
            expired: Date.now() + expires,
            raw: data
        }));
        return this.promise;
    }

    del(id) {
        this.promise = this.promise.then(() => this.store.del(id));
        return this.promise;
    }
}

DataCache.Cache = Cache;
DataCache.MemoryStore = MemoryStore;
DataCache.RadisStore = RadisStore;
DataCache.LocalStore = LocalStore;

export default DataCache;

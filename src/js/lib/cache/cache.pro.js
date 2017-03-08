import DataCache from "../datacache.js";
const { LocalStore } = DataCache;
const store = new LocalStore();
const Cache = new DataCache({ store });
export default Cache;

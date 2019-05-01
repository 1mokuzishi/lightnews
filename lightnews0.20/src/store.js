import { createStore } from "redux";
import appLN from './reducers'
let store = createStore(appLN);
export default store;
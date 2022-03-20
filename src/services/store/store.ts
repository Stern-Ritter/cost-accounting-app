import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { rootReducer } from "../reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const store = createStore(rootReducer, enhancer);

// export type State = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

import { createStore, compose, applyMiddleware } from "redux";
import { autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "../ducks";

const middlewares = [
  thunk
]

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      autoRehydrate(),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  if (module.hot) {
    module.hot.accept("../ducks", () => {
      const nextRootReducer = require("../ducks").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

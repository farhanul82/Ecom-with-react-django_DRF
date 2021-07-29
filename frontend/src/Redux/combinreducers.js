import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Thunk from "redux-thunk";

import { ProductReducer } from "./Reducer/ProductReducer";
import { CategoryReducer } from "./Reducer/CategoryReducer";
import { Auth } from "./Reducer/Auth";
import { CommentReducer } from "./Reducer/CommentReducer";
import { CartReducer } from "./Reducer/CartReducer";

const store = createStore(
  combineReducers({
    auth: Auth,
    product: ProductReducer,
    catogorie: CategoryReducer,
    cart:CartReducer,
    comment: CommentReducer,
  }),
  composeWithDevTools(applyMiddleware(Thunk))
);
export default store; 

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk'
import { CartReducer } from './reducer/CartReducer';
import { CategoryReducer } from './reducer/CategoryReducer';
import { NewsReducer } from './reducer/NewsReducer';
import { ProductReducer } from './reducer/ProductReducer';
import { SizeReducer } from './reducer/SizeReducer';
import { UserLoginReducer } from './reducer/UserLoginReducer';
import { UserReducer } from './reducer/UserReducer';

const rootReducer = combineReducers({
    // state ứng dụng
    ProductReducer,
    CategoryReducer,
    UserReducer,
    NewsReducer,
    UserLoginReducer,
    CartReducer,
    SizeReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
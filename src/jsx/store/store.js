import {createStore,combineReducers} from 'redux'
import createReducer  from './Create/Create.reducer'
import userReducer from './User/User.reducer'
import resetReducer from './Reset/Reset.reduce'

import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}
const router = combineReducers({
    create:createReducer,
    user:userReducer,
    reset:resetReducer,
    
})
const persistedReducer = persistReducer(persistConfig, router)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {store, persistor};

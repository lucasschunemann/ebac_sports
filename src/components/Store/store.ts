import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../../redux/slices/cartSlice'
import favoritesReducer from '../../redux/slices/favoritesSlice'
import { apiSlice } from '../../redux/slices/apiSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store

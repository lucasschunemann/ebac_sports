// src/redux/slices/cartSlice.ts

import { createSlice } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  name: string
  price: number
}

interface CartState {
  items: CartItem[]
  totalAmount: number
}

const initialState: CartState = {
  items: [],
  totalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
      state.totalAmount += action.payload.price
    },
    removeItem(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id)
        state.totalAmount -= existingItem.price
      }
    }
  }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer

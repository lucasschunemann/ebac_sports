import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}

const initialState: Produto[] = []

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Produto>) {
      state.push(action.payload)
    },
    removeFavorite(state, action: PayloadAction<Produto>) {
      return state.filter((produto) => produto.id !== action.payload.id)
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

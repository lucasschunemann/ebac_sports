import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../../redux/slices/cartSlice'
import { useGetItemsQuery } from '../../redux/slices/apiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface CartItem {
  id: string
  name: string
  price: number
}

const CartComponent: React.FC = () => {
  const cart = useSelector(
    (state: { cart: { items: CartItem[]; totalAmount: number } }) => state.cart
  )
  const dispatch = useDispatch()
  const { data: items, error, isLoading } = useGetItemsQuery({})

  const handleAddItem = (item: CartItem) => {
    dispatch(addItem(item))
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id))
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as FetchBaseQueryError).status}</div>

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total Amount: ${cart.totalAmount}</h2>

      <h2>Items</h2>
      <ul>
        {items?.map((item: CartItem) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleAddItem(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartComponent

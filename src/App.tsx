import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import CartComponent from './components/Cart/CartComponent'
import { GlobalStyle } from './styles'
import { addItem } from './redux/slices/cartSlice'
import { addFavorite, removeFavorite } from './redux/slices/favoritesSlice'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const favoritos = useSelector((state: { favorites: Produto[] }) => state.favorites)
  const carrinho = useSelector((state: { cart: { items: Produto[] } }) => state.cart.items)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => setProdutos(res))
  }, [])

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(addItem(produto))
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      dispatch(removeFavorite(produto))
    } else {
      dispatch(addFavorite(produto))
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos || []} itensNoCarrinho={carrinho || []} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
        <CartComponent />
      </div>
    </>
  )
}

export default App

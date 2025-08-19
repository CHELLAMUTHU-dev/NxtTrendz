import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || [],
  }

  componentDidUpdate(prevProps, prevState) {
    const {cartList} = this.state
    if (prevState.cartList !== cartList) {
      localStorage.setItem('cartList', JSON.stringify(cartList))
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id)

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === productObject.id) {
            const updateQuantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const updateCartList = [...cartList, product]
      this.setState({cartList: updateCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterdList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filterdList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const UpdateQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: UpdateQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updateQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

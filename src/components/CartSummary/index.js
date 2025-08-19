// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.quantity * eachItem.price
      })

      return (
        <>
          <div>
            <h1 className="cart-summary-heading">
              <span>Order Total:</span>Rs {total} /-
            </h1>
            <p className="cart-summary">{cartList.length} Items in cart</p>
            <button type="button" className="checkout-btn">
              checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
